import React, { useContext, useEffect, useState } from "react";
import "./css/profile.css";
import { userContext } from "../App";

function Profile() {
  const { state } = useContext(userContext);
  const [post, setPost] = useState([]);
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        // console.log(result.mypost);
        setPost(result.mypost);
      });
  }, []);
  const userData = JSON.parse(localStorage.getItem("user"));
  // console.log(userData);

  return (
    <div className="container">
      <div className="profile ">
        <div className="profile__info">
          <img src="https://via.placeholder.com/150" alt="profile_pic" />
        </div>
        <div className="user__profile__info">
          <div className="user_name">
            <span>{userData ? userData.username : "loading..."}</span>
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
            <h6>{userData ? userData.name : "loading..."}</h6>
            <p>bio1</p>
            <p>bio27</p>
          </div>
        </div>
      </div>
      <div className="user__posts">
        <span>posts</span>

        {post.map((galary) => {
          return <img src={galary.photos} id={galary._id} alt="profile_pic" />;
        })}
      </div>
    </div>
  );
}

export default Profile;
