const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  const { username, password } = req.headers;
  const user = await Admin.findOne({
    username,
  });
  if (!user) {
    res.status(400).json({
      message: "User does not exits",
    });
    return;
  }
  if (password !== user.password) {
    res.status(400).json({
      message: "Wrong password",
    });
    return;
  }
  next();
}

module.exports = adminMiddleware;
