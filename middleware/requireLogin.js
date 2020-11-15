import jwt from "jsonwebtoken";
import secretPlace from "../config/key.js";
import schema from "../models/schema.js";
const { JWT_Token } = secretPlace;

export default (req, res, next) => {
  const { authorization } = req.headers;
  // console.log("printing authorization", authorization);
  //authorization == Bearer "token "
  var token = "";
  if (authorization) {
    token = authorization.replace("Bearer ", "");
  } else return res.status(401).json({ error: "You must be loggedIn." });

  jwt.verify(token, JWT_Token, (err, payload) => {
    if (err) return res.status(401).json({ error: "You must be loggedIn" });
    else {
      const { _id } = payload;
      schema.findById(_id).then((userdata) => {
        req.user = userdata;

        next();
      });
    }
  });
};
