import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { authUserWithEmailPassword, authUserWithSocial } from "fbase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggleAccount, setToggleAccount] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (event) => {
    let result;
    event.preventDefault();
    if (toggleAccount) {
      result = await authUserWithEmailPassword(
        createUserWithEmailAndPassword,
        email,
        password
      );
    } else {
      result = await authUserWithEmailPassword(
        signInWithEmailAndPassword,
        email,
        password
      );
    }
    if (result.message) {
      setErrorMessage(result.message);
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onAccountToggle = (event) => {
    setToggleAccount(event.target.value === "true" ? true : false);
  };

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = GoogleAuthProvider;
    } else if (name === "github") {
      provider = GithubAuthProvider;
    }
    const result = await authUserWithSocial(provider);
    console.log(result);
  };

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="radio"
            name="account-toggle"
            id="account-signin"
            value="false"
            checked={!toggleAccount}
            onChange={onAccountToggle}
          />
          <label htmlFor="account-signin">Sign In</label>
          <input
            type="radio"
            name="account-toggle"
            id="account-create"
            value="true"
            checked={toggleAccount}
            onChange={onAccountToggle}
          />
          <label htmlFor="account-create">Create Account</label>
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your Email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="submit"
            value={toggleAccount ? "Create Account" : "Log in"}
          />
        </div>
        <div>
          <button type="button" onClick={onSocialClick} name="google">
            Continue with Google
          </button>
          <button type="button" onClick={onSocialClick} name="github">
            Continue with Github
          </button>
        </div>
      </form>
    </div>
  );
}
