const jwt = require("jsonwebtoken");
const PRIVATE_KEY = "course-selling-app";

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
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

module.exports = adminMiddleware;
