import React, { useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
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
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            name="email"
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
            placeholder="Enter your password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div>
          <input type="submit" value="Log in" />
        </div>
        <div>
          <button>Continue with Google</button>
          <button>Continue with Github</button>
        </div>
      </form>
    </div>
  );
}
