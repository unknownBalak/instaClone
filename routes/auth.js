import express from "express";
import schema from "../models/schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import secretPlace from "../config/key.js";
const router = express.Router();
const { JWT_Token } = secretPlace;

router.post("/signup", (req, res) => {
  const { email, password, name } = req.body;
  console.log("in auth.js", req.body);
  if (!name || !email || !password) {
    res.status(422).json({ error: "please fill of the data!!" });
  }
  schema.findOne({ email: email }).then((userdata) => {
    var user = "";

    userdata
      ? res.status(422).json({ error: "User already exist!!" })
      : bcrypt.hash(password, 12).then((new_password) => {
          user = new schema({
            name,
            email,
            password: new_password,
          });
          user
            .save()
            .then(() => res.json({ message: "Data inserted successfully!!" }))
            .catch((err) => console.log(err));
        });
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    json.status(422).json({ error: "please Insert Userid or password!!" });
  }
  schema
    .findOne({ email: email })
    .then((savedUser) => {
      savedUser
        ? bcrypt.compare(password, savedUser.password).then((doMatch) => {
            if (doMatch) {
              // res.json({ message: "successfully signed in" });
              const token = jwt.sign({ _id: savedUser._id }, JWT_Token);
              const { _id, name, email } = savedUser;
              res.json({ token, user: { _id, name, email } });
            } else {
              return res.status(422).json({ error: "Invalid Email or Password!!" });
            }
          })
        : res.status(422).json({ error: "Invalid email or password" });
    })
    .catch((error) => console.log(error));
});

export default router;
