import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const history = useHistory();

  function fetchData() {
    return new Promise((resolve, reject) => {
      const Data = new FormData();
      Data.append("file", image);
      Data.append("upload_preset", "insta-clone");
      Data.append("cloud_name", "my-media");
      fetch("https://api.cloudinary.com/v1_1/my-media/image/upload", {
        method: "post",
        body: Data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) resolve(data);
        });
    });
  }

  async function postDetails(e) {
    e.preventDefault();
    try {
      let fetchdata = await fetchData();
      // console.log(fetchdata.url);
      //
      if (fetchdata) {
        setUrl(fetchdata.url);
      } else {
        console.log(fetchdata.error);
      }
    } catch (error) {
      console.log(error);
    }

    fetch("/createpost", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
      body: JSON.stringify({
        title,
        body,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#d50000 red accent-4" });
        } else {
          M.toast({ html: "Created Post", classes: "#00e676 green accent-3" });
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <form
        style={{ border: "1px solid grey", boxShadow: "2px 4px 4px 4px grey", marginTop: "30px" }}
        onSubmit={postDetails}
      >
        <input
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Body"
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <span
          style={{
            backgroundColor: "blue",
            padding: "10px",
            color: "white",
            marginRight: "10px",
          }}
        >
          File:&nbsp;{" "}
        </span>
        <label style={{ fontSize: "20px" }}>
          <input
            type="file"
            style={{ cursor: "pointer" }}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />{" "}
        </label>
        <button
          type="submit"
          style={{ display: "block", padding: "10px", backgroundColor: "blue" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
