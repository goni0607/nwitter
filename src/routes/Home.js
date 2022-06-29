import React, { useEffect, useState } from "react";
import { useInput } from "hooks/useInput";
import { dbService, storageService } from "fbase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import Nweet from "components/Nweet";
import { v4 as uuidv4 } from "uuid";

export default function Home({ userObj }) {
  const nweet = useInput();
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState(null);
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
    let attachmentUrl = "";
    console.log(attachment);
    if (attachment !== null) {
      const storageRef = ref(storageService, `images/${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, attachment, 'data_url');
      attachmentUrl = await getDownloadURL(response.ref);
    }

    await addDoc(collection(dbService, "nweets"), {
      text: nweet.value,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    });
    nweet.changeValue("");
    setAttachment(null);
  };

  const onChangeFile = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      setAttachment(finishedEvent.target.result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearPhoto = () => {
    setAttachment(null);
  }
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
          required
        />
        <input type="file" accept="image/*" onChange={onChangeFile} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img
              src={attachment}
              alt="preview attach file"
              style={{ maxWidth: "480px" }}
            />
            <button onClick={onClearPhoto}>Clear Photo</button>
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
