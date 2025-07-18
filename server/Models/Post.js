const mongoose = require("mongoose");
const { Schema } = mongoose;

const blog = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    trim: true
  },
  author: {
    type: String,
    default: 'Anonymous'
  },
  date: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

const Blog = mongoose.model('Blog', blog);
module.exports = Blog;
