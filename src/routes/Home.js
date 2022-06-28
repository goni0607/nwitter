import React from "react";
import { useInput } from "hooks/useInput";
import { dbService } from "fbase";
import { collection, addDoc } from "firebase/firestore";

export default function Home() {
  const nweet = useInput();
  const onSubmit = async (event) => {
    event.preventDefault();
    const doc = await addDoc(collection(dbService, "nweets"), {
      nweet: nweet.value,
      createAt: Date.now(),
    });
    console.log(doc);
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
    </div>
  );
}
