import React from "react";
import { authService } from "fbase";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  return (
    <div>
      <h1>Profile</h1>
      <button onClick={onLogOutClick}>Log out</button>
    </div>
  );
}
