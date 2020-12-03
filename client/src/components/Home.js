import React, { useContext, useState, useEffect } from "react";
import "./css/Home.css";
import { userContext } from "../App";
function Home() {
  const { state, dispatch } = useContext(userContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setData(result.posts);
        // console.log(data);
        // console.log(data.likes);
      });
  }, []);
  const handleLike = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDisLike = (id) => {
    fetch("/dislike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log("we got result from db");
        // console.log(result);
        // setLike(result.likes);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
      body: JSON.stringify({
        postId: postId,
        text: text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) return result;
          else return item;
        });
        setData(newData);
      });
  };
  // console.log(data);
  return (
    <div className="container">
      {data.map((item) => {
        return (
          <div className="container1" key={item._id} style={{ border: "4px solid" }}>
            <div className="home">
              <div className="following__pic">
                <img
                  src="https://via.placeholder.com/50"
                  alt="profile_pic"
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className="following__info">
                <p>{item ? item.postBy.name : "loading..."}</p>
              </div>
              <div className="right_button">
                <div style={{ display: "block" }}>.</div>
                <div style={{ display: "block" }}>.</div>
                <div style={{ display: "block" }}>.</div>
              </div>
            </div>
            <div className="follwoing__post">
              <img src={item.photos} style={{ width: "100%" }} />
            </div>
            <div className="img__description">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              {item.likes.includes(state._id) ? (
                <i className="material-icons thumb_down" onClick={() => handleDisLike(item._id)}>
                  &nbsp; thumb_down
                </i>
              ) : (
                <i
                  className="material-icons thumb_up"
                  style={{ marginLeft: "13px" }}
                  onClick={() => handleLike(item._id)}
                >
                  thumb_up
                </i>
              )}

              <h6>{item.likes.length} likes </h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <div style={{ height: "23px", overflowY: "scroll" }}>
                {item.comments.map((record) => {
                  return (
                    <p key={record.text}>
                      <span style={{ fontWeight: "800" }}>{record.postBy.name}</span> {record.text}
                    </p>
                  );
                })}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                  e.target[0].value = "";
                }}
              >
                <input type="text" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
