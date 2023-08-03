const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: String,
    content: String,
    summary: String,
    image: String,
    author: {type: Schema.Types.ObjectId, ref: "User"},
  },
  {
    timestamps: true,
  }
);

const blogModel = mongoose.model("Post", blogSchema);

module.exports = blogModel;