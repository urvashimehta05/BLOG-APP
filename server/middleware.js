// middleware/isLoggedIn.js

module.exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({ message: "You must be logged in to perform this action" });
};
