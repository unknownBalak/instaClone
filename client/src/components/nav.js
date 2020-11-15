import React from "react";
import "./css/nav.css";
import { Link } from "react-router-dom";
function nav() {
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left" style={{ fontFamily: "'Satisfy', cursive" }}>
            Instagram
          </Link>
          <ul id="nav-mobile" className="right ">
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/profile">prifile</Link>
            </li>
            <li>
              <Link to="/createpost">createPost</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default nav;
