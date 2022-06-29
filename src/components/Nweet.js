import React from "react";

export default function Nweet({ nweet, isOnwer }) {
  return (
    <li>
      {nweet.nweet} - {new Date(nweet.createdAt).toString()}
      {isOnwer && (
        <>
          <button>Edit Nweet</button>
          <button>Delete Nweet</button>
        </>
      )}
    </li>
  );
}
