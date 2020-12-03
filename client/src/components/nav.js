import React, { useContext } from "react";
import "./css/nav.css";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../App";
export default function Nav() {
  const { state, dispatch } = useContext(userContext);
  const history = useHistory();
  const renderList = () => {
    if (state) {
      return [
        <li key="profile">
          <Link to="/profile">profile</Link>
        </li>,
        <li key="createpost">
          <Link to="/createpost">createPost</Link>
        </li>,
        <li key="createPost">
          <button
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/login");
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li key="signup">
          <Link to="/signup">SignUp</Link>
        </li>,
        <li key="signin">
          <Link to="/login">Login</Link>
        </li>,
      ];
    }
  };
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <Link
            to={state ? "/" : "/login"}
            className="brand-logo left"
            style={{ fontFamily: "'Satisfy', cursive" }}
          >
            Instagram
          </Link>
          <ul id="nav-mobile" className="right ">
            {renderList()}
          </ul>
        </div>
      </nav>
    </div>
  );
}
