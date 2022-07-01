import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function Navigation({ userObj }) {
  return (
    <nav>
      <ul className="nav">
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} color={"#04aaff"} size="2x" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} color={"#04aaff"} size="2x" />
            <span>{userObj.displayName} Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
