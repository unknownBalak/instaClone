import React from "react";
import "./css/profile.css";
function Profile() {
  return (
    <div className="container">
      <div className="profile ">
        <div className="profile__info">
          <img src="https://via.placeholder.com/150" alt="profile_pic" />
        </div>
        <div className="user__profile__info">
          <div className="user_name">
            <span>user.name</span>
            <button className="btn btn-primary" style={{ backgroundColor: "blue" }} type="submit">
              Follow
            </button>
          </div>
          <div className="user__social_influence">
            <span>519 posts &nbsp; </span>
            <span>15k followers &nbsp;</span>
            <span>11 following &nbsp;</span>
          </div>
          <div className="user__bio">
            <h6>Full Name</h6>
            <p>bio1</p>
            <p>bio27</p>
          </div>
        </div>
      </div>
      <div className="user__posts">
        <span>posts</span>
        <img src="https://via.placeholder.com/150" alt="profile_pic" />
        <img src="https://via.placeholder.com/150" alt="profile_pic" />
        <img src="https://via.placeholder.com/150" alt="profile_pic" />
        <img src="https://via.placeholder.com/150" alt="profile_pic" />
        <img src="https://via.placeholder.com/150" alt="profile_pic" />
        <img src="https://via.placeholder.com/150" alt="profile_pic" />
      </div>
    </div>
  );
}

export default Profile;
