const mongoose = require('mongoose');
const Blog = require('../Models/Post');
const dummyPosts = require('./data');

async function initData() {
  try {
    await mongoose.connect('mongodb://localhost:27017/');
    console.log('✅ Connected to DB');

    await Blog.deleteMany(); // optional: clean existing
 const postWithOwner = dummyPosts.map(post => ({
      ...post,
      owner: "6878d27b103b27dafcdd7445"
    }));
    await Blog.insertMany(postWithOwner);
    console.log(postWithOwner[0].owner);
  } catch (err) {
    console.error('❌ Insert Error:', err.message);
    console.error(err.errors); // 👀 shows exactly what’s wrong
  } finally {
    mongoose.connection.close();
  }
}

initData();
