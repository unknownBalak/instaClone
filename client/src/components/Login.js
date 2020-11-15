import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./css/Login.css";
import M from "materialize-css";
function Login() {
  const [email, setEmail] = useState([""]);
  const [password, setPassword] = useState([""]);
  const history = useHistory();

  const handleSubmit = (data) => {
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
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#d50000 red accent-4" });
        } else {
          console.log(data.token);
          localStorage.setItem("userToken", data.token);
          localStorage.setItem("userId", data._id);
          M.toast({ html: "LoggedIn successfully!!", classes: "#00e676 green accent-3" });
          history.push("/");
        }
      })
      .catch((err) => console.log(err));

    setEmail("");
    setPassword("");
    data.preventDefault();
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
              type="text"
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
