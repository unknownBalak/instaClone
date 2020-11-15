import express from "express";
import post from "../models/post.js";
import requireLogin from "../middleware/requireLogin.js";

const router = express.Router();

router.get("/allpost", (req, res) => {
  post
    .find()
    .populate("postBy", "_id, name")
    .then((posts) => {
      res.status(400).json({ posts });
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
    .then((result) => res.status(200).json({ post: result }))
    .catch((err) => console.log(err));
});

router.get("/mypost", requireLogin, (req, res) => {
  post
    .find({ postBy: req.user._id })
    .populate("postBy", "_id name")
    .then((mypost) => res.status(400).json({ mypost }))
    .catch((error) => console.log(error));
});
export default router;
