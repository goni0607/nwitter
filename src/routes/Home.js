import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

export default function Home({ userObj }) {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const nweets = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweets);
    });
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <section>
        <header>
          <h2 className="sr-only">Nweet Lists</h2>
        </header>
        <ul style={{ marginTop: 30 }}>
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
