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
    <div className="container">
      <h1 className="sr-only">Profile</h1>
      <form onSubmit={onUpdateProfile} className="profileForm">
        <label htmlFor="displayName" className="sr-only">
          Display Name
        </label>
        <input
          type="text"
          id="displayName"
          value={txtDisplayName.value}
          onChange={txtDisplayName.onChange}
          className="formInput"
        />
        <input
          type="submit"
          value="Update profile"
          className="formBtn"
          style={{ marginTop: 10 }}
        />
      </form>
      <button onClick={onLogOutClick} className="formBtn cancelBtn logOut">
        Log out
      </button>
    </div>
  );
}
