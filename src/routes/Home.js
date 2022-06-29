import React, { useEffect, useState } from "react";
import { useInput } from "hooks/useInput";
import { dbService } from "fbase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import Nweet from "components/Nweet";

export default function Home({ userObj }) {
  const nweet = useInput();
  const [nweets, setNweets] = useState([]);
  const [nweetImage, setNweetImage] = useState(null);
  /* 기본 get 방식
  const getNweets = async () => {
    const querySnapshot = await getDocs(collection(dbService, "nweets"));
    querySnapshot.forEach((doc) => {
      const nweetObject = {
        ...doc.data(),
        id: doc.id,
      };
      setNweets((prev) => [nweetObject, ...prev]);
    });
  };
  */

  useEffect(() => {
    // getNweets();
    const q = query(collection(dbService, "nweets"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const nweets = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweets);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "nweets"), {
      text: nweet.value,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    nweet.changeValue("");
  };

  const onChangeFile = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      setNweetImage(finishedEvent.target.result);
    };
    reader.readAsDataURL(theFile);
  };
  return (
    <div>
      <h1>Nwitter</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={nweet.value}
          onChange={nweet.onChange}
        />
        <input type="file" accept="image/*" onChange={onChangeFile} />
        <input type="submit" value="Nweet" />
        {nweetImage && (
          <div>
            <img src={nweetImage} alt="preview attach file" />
          </div>
        )}
        <div></div>
      </form>
      <section>
        <header>
          <h2>Nweet Lists</h2>
        </header>
        <ul>
          {nweets.map((nweet) => (
            <Nweet
              key={nweet.id}
              nweet={nweet}
              isOnwer={nweet.creatorId === userObj.uid}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
