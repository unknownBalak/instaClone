import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photos: {
    type: String,
    required: true,
  },
  postBy: {
    type: ObjectId,
    ref: "usersdata",
  },
});

export default mongoose.model("post", postSchema);
