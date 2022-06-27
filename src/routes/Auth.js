import React, { useState } from "react";
import { createUser, signInUser } from "fbase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggleAccount, setToggleAccount] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (event) => {
    let data;
    event.preventDefault();
    if (toggleAccount) {
      data = await createUser(email, password);
    } else {
      data = await signInUser(email, password);
    }
    console.log(data);
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
    <div>
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
          <button>Continue with Google</button>
          <button>Continue with Github</button>
        </div>
      </form>
    </div>
  );
}
