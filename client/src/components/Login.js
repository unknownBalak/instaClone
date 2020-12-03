import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./css/Login.css";
import M from "materialize-css";
import { userContext } from "../App";

function Login() {
  const { state, dispatch } = useContext(userContext);
  const [email, setEmail] = useState([""]);
  const [password, setPassword] = useState([""]);
  const history = useHistory();

  const handleSubmit = (data) => {
    data.preventDefault();

    // console.log(email, password);
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#d50000 red accent-4" });
        } else {
          // console.log(data);
          // console.log(data.token);
          localStorage.setItem("userToken", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          // console.log(data.user);

          dispatch({ type: "USER", payload: data.user });

          M.toast({ html: "LoggedIn successfully!!", classes: "#00e676 green accent-3" });
          history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
        M.toast({ html: error, classes: "#d50000 red accent-4" });
      });

    setEmail("");
    setPassword("");
  };
  return (
    <div className="container">
      <div className="card">
        <h1>Instagram</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
          </label>
          <label>
            Password
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
            />
          </label>
          <button
            className="btn btn-primary"
            style={{ backgroundColor: "purple", margin: "auto" }}
            type="submit"
          >
            Submit
          </button>
          <span>
            {" "}
            New User? <Link to="/signup">Sign Up</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
