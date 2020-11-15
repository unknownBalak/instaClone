import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./css/signup.css";
import M from "materialize-css";

function Signup() {
  const [email, setEmail] = useState([""]);
  const [name, setName] = useState([""]);
  const [password, setPassword] = useState([""]);
  const history = useHistory();

  const handleSubmit = (data) => {
    alert(`email is ${email} and name is ${name}`);

    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#d50000 red accent-4" });
        } else {
          M.toast({ html: data.message, classes: "#00e676 green accent-3" });
          history.push("/login");
        }
      })
      .catch((err) => console.log("got an error", err));

    setName("");
    setEmail("");
    setPassword("");
    data.preventDefault();
  };
  return (
    <div className="container">
      <div className="card">
        <h1>Instagram</h1>
        <h5 style={{ textAlign: "center", color: "red", fontWeight: "700", fontStyle: "italic" }}>
          SignUp
        </h5>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
          </label>
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
            Already have an Account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
