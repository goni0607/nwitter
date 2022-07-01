import { authUserWithEmailPassword } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";

export default function AuthForm() {
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

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <div style={{ marginBottom: 15 }}>
          <input
            type="radio"
            name="account-toggle"
            id="account-signin"
            value="false"
            checked={!toggleAccount}
            onChange={onAccountToggle}
          />
          <label htmlFor="account-signin" className="ml-1">
            Sign In
          </label>
          <input
            type="radio"
            name="account-toggle"
            id="account-create"
            value="true"
            checked={toggleAccount}
            onChange={onAccountToggle}
            className="ml-3"
          />
          <label htmlFor="account-create" className="ml-1">
            Create Account
          </label>
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
            className="authInput"
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
            className="authInput"
          />
        </div>
        <div>
          <input
            type="submit"
            value={toggleAccount ? "Create Account" : "Log in"}
            className="authInput authSubmit"
          />
          {errorMessage && <p className="authError">{errorMessage}</p>}
        </div>
      </form>
    </>
  );
}
