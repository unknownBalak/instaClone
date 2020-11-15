import express from "express";
import mongoose from "mongoose";
import secretPlace from "./config/key.js";
const app = express();
import auth from "./routes/auth.js";
import post from "./routes/post.js";
import path from "path";

const port = process.env.PORT || 3000;

//middle ware

app.use(express.json());
const { url } = secretPlace;
//db connection;
mongoose.connect(
  url,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    err ? console.log(JSON.stringify(err)) : console.log("MongoDB connection SUccessful");
  }
);

app.use(auth);
app.use(post);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(port, console.log(`server is running at ${port}.....`));
