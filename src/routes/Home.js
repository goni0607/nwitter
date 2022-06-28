import React from "react";
import { useInput } from "hooks/Input";

export default function Home() {
  const nweet = useInput();
  return (
    <div>
      <h1>Nwitter</h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          type="text"
          placeholder="Wha your mind?"
          maxLength={120}
          {...nweet}
        />
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
}
