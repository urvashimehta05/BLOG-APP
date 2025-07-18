const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User"); // your user model
const cors = require("cors");
const Blog = require("./models/Post");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const {isLoggedIn} = require("./middleware.js")
const app = express();

app.use(cors({
  origin: "http://localhost:5173", // ✅ Vite frontend
  credentials: true // ✅ Required for cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ IMPORTANT for login form
app.use(cookieParser());

app.use(session({
  secret: "thisshouldbeabettersecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); // ✅ passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// === DATABASE CONNECTION ===
mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// === AUTH CHECK ROUTE ===
app.get('/api/test-auth', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      isLoggedIn: true,
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email
    });
  } else {
    return res.json({ isLoggedIn: false });
  }
});

// === BLOG ROUTES ===
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Blog.find({}).populate("owner", 'username email');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

app.post('/api/posts', isLoggedIn, async (req, res) => {
  try {
    const newBlog = new Blog(req.body.post);
    newBlog.owner = req.user._id;
    newBlog.author = req.user.username;
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog post" });
  }
});

// app.get('/api/posts/:id', isLoggedIn, async (req, res) => {
//   try {
//     const post = await Blog.findById(req.params.id).populate("owner",);
//     if (!post) return res.status(404).json({ message: 'Post not found' });
//     res.json(post);
//     console.log(post);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching post', error });
//   }
// });
app.get('/api/posts/:id', isLoggedIn, async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id)
      .populate('owner'); // 👈 this must match 'ref' in Blog schema

    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching post', error });
  }
});

app.delete('/api/posts/:id', isLoggedIn, async (req, res) => {
  try {
    const deletedPost = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting post" });
  }
});

app.put('/api/posts/update/:id', isLoggedIn, async (req, res) => {
  try {
    const { title, content, image, date } = req.body;
    const updatedPost = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        image,
        date,
        author: req.user.username,
        owner: req.user._id
      },
      { new: true }
    );
    if (!updatedPost) return res.status(404).json({ message: "Post not found" });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
});

// === AUTH ROUTES ===
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(409).json({ message: "User already exists" });

    const newUser = new User({ username, email });
    await User.register(newUser, password);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during signup" });
  }
});

app.post('/api/login', (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ message: info?.message || "Invalid credentials" });
    }
    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: "Login error" });
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
});

app.post('/api/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.status(200).json({ message: "Logged out successfully" });
  });
});

// Debugging route (optional)
app.get('/api/debug-session', (req, res) => {
  res.json({
    session: req.session,
    user: req.user,
    isAuthenticated: req.isAuthenticated()
  });
});
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
// === SERVER START ===
app.listen(5000, () => {
  console.log('🚀 Backend running at http://localhost:5000');
});

