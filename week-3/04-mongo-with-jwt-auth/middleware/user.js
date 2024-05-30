const jwt = require("jsonwebtoken");
const PRIVATE_KEY = "course-selling-app";
async function userMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, PRIVATE_KEY);
    res.locals.username = decoded.username;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
    });
  }
}

module.exports = userMiddleware;
