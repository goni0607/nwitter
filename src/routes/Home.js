import React, { useEffect, useState } from "react";
import { useInput } from "hooks/useInput";
import { dbService } from "fbase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function Home() {
  const nweet = useInput();
  const [nweets, setNweets] = useState([]);

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

  useEffect(() => {
    getNweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "nweets"), {
      nweet: nweet.value,
      createAt: Date.now(),
    });
    nweet.changeValue("");
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
        <input type="submit" value="Nweet" />
      </form>
      <section>
        <ul>
          {nweets.map((nweet) => (
            <li key={nweet.id}>
              {nweet.nweet} - {new Date(nweet.createAt).toString()}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
