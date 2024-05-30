const { User } = require("../db");

async function userMiddleware(req, res, next) {
  const { username, password } = req.headers;
  const user = await User.findOne({
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

module.exports = userMiddleware;
