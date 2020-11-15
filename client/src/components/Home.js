import React from "react";
import "./css/Home.css";
function Home() {
  return (
    <div className="container">
      <div className="container1">
        <div className="home">
          <div className="following__pic">
            <img
              src="https://via.placeholder.com/50"
              alt="profile_pic"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className="following__info">
            <p>Name</p>
            <p>Address</p>
          </div>
          <div className="right_button">
            <div style={{ display: "block" }}>.</div>
            <div style={{ display: "block" }}>.</div>
            <div style={{ display: "block" }}>.</div>
          </div>
        </div>
        <div className="follwoing__post">
          <img src="https://via.placeholder.com/400" />
        </div>
        <div className="img__description">
          <i className="material-icons" style={{ color: "red" }}>
            favorite
          </i>
          <h6>title : </h6>
          <p>message :</p>
          <input type="text" />
        </div>
      </div>
      <div className="container1">
        <div className="home">
          <div className="following__pic">
            <img
              src="https://via.placeholder.com/50"
              alt="profile_pic"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className="following__info">
            <p>Name</p>
            <p>Address</p>
          </div>
          <div className="right_button">
            <div style={{ display: "block" }}>.</div>
            <div style={{ display: "block" }}>.</div>
            <div style={{ display: "block" }}>.</div>
          </div>
        </div>
        <div className="follwoing__post">
          <img src="https://via.placeholder.com/400" />
        </div>
        <div className="img__description">
          <i className="material-icons" style={{ color: "red" }}>
            favorite
          </i>
          <h6>title : </h6>
          <p>message :</p>
          <input type="text" />
        </div>
      </div>
    </div>
  );
}

export default Home;
