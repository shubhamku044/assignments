const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt = require("jsonwebtoken");
const router = Router();
const { Admin, User, Course } = require("../db");

const PRIVATE_KEY = "course-selling-app";

function generateToken(user) {
  return jwt.sign({ username: user.username }, PRIVATE_KEY, {
    expiresIn: "1h",
  });
}

// Admin Routes
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUser = await Admin.findOne({ username });
    if (isUser) {
      res.status(400).send({
        message: `Admin already exists with username: ${username}`,
      });
    }
    const admin = new Admin({
      username,
      password,
    });
    const result = await admin.save();
    res.status(201).send({
      message: "Admin created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUser = await Admin.findOne({ username });
    if (!isUser) {
      res.status(400).send({
        message: "User not found",
      });
    }
    if (isUser.password !== password) {
      res.status(400).send({
        message: "Invalid password",
      });
    }
    const token = generateToken(isUser);
    res.status(200).send({
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  try {
    const { title, description, imageLink, price } = req.body;

    const course = new Course({
      title,
      description,
      imageLink,
      price,
    });
    const result = await course.save();

    res.status(201).send({
      message: "Course created successfully",
      course: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).send({
      courses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

module.exports = router;
