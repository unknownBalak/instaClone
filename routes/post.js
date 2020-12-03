import express from "express";
import post from "../models/post.js";
import requireLogin from "../middleware/requireLogin.js";

const router = express.Router();

router.get("/allpost", requireLogin, (req, res) => {
  post
    .find()
    .populate("postBy", "_id name")
    .populate("comments.postBy", "_id, name")
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((err) => console.log(err));
});

router.post("/createpost", requireLogin, (req, res) => {
  const { title, body, pic } = req.body;
  console.log("we are server.routes.post.js", req.body);
  if (!title || !body || !pic) {
    return res.status(422).json({ error: "Please fill all fields!!" });
  }
  // console.log("hey we are in req.user", req.user);
  // res.json({ message: "okay" });
  req.user.password = undefined;
  const userpost = new post({
    title,
    body,
    photos: pic,
    postBy: req.user,
  });
  userpost
    .save()
    .then((result) => res.status(200).json({ post: `I got this,  ${result}` }))
    .catch((err) => console.log(err));
});

router.get("/mypost", requireLogin, (req, res) => {
  post
    .find({ postBy: req.user._id })
    .populate("postBy", "_id name")
    .then((mypost) => res.status(400).json({ mypost }))
    .catch((error) => console.log(error));
});

router.put("/dislike", requireLogin, (req, res) => {
  post
    .findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user._id },
      },
      {
        new: true,
      }
    )
    .populate("comments.postBy", "_id name")
    .populate("postBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/like", requireLogin, (req, res) => {
  post
    .findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user._id },
      },
      {
        new: true,
      }
    )
    .populate("comments.postBy", "_id name")
    .populate("postBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postBy: req.user._id,
  };
  post
    .findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      {
        new: true,
      }
    )
    .populate("comments.postBy", "_id name")
    .populate("postBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

export default router;
