import React, { useEffect } from "react";
import { authService, dbService } from "fbase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

export default function Profile({ userObj }) {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  const getNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log({
        ...doc.data(),
        id: doc.id,
      });
    });
  };

  useEffect(() => {
    getNweets();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <button onClick={onLogOutClick}>Log out</button>
    </div>
  );
}
