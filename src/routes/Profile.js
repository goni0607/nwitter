import React, { useEffect } from "react";
import { authService, dbService } from "fbase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useInput } from "hooks/useInput";

export default function Profile({ userObj, refreshUser }) {
  const txtDisplayName = useInput(userObj.displayName);
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

  const onUpdateProfile = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== txtDisplayName.value) {
      await updateProfile(authService.currentUser, {
        displayName: txtDisplayName.value,
      });
      refreshUser();
    }
  };

  useEffect(() => {
    getNweets();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={onUpdateProfile}>
        <label htmlFor="displayName">Display Name: </label>
        <input
          type="text"
          id="displayName"
          value={txtDisplayName.value}
          onChange={txtDisplayName.onChange}
        />
        <input type="submit" value="Update profile" />
      </form>
      <button onClick={onLogOutClick}>Log out</button>
    </div>
  );
}
