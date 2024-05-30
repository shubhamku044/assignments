const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const { Admin, User, Course } = require("../db");
const userMiddleware = require("../middleware/user");

const PRIVATE_KEY = "course-selling-app";
function generateToken(user) {
  return jwt.sign({ username: user.username }, PRIVATE_KEY, {
    expiresIn: "1h",
  });
}

// User Routes
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUser = await User.findOne({ username });
    if (isUser) {
      res.status(400).send({
        message: `User already exists with username: ${username}`,
      });
    }
    const user = new User({
      username,
      password,
    });
    console.log(username, password);
    const result = await user.save();
    res.status(201).send({
      message: "user created successfully",
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
    const isUser = await User.findOne({ username });
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

router.get("/courses", userMiddleware, async (req, res) => {
  try {
    const courses = await Course.find();
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

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  try {
    const user = res.locals.username;
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);

    if (!course) {
      res.status(400).send({
        message: "Course not found",
      });
    }

    const userObj = await User.findOne({ username: user });
    // Check if user has already purchased the course
    userObj.purchasedCourses.forEach((purchasedCourse) => {
      if (purchasedCourse.toString() === course._id.toString()) {
        res.status(400).send({
          message: "Course already purchased",
        });
        return;
      }
    });
    const result = await User.updateOne(
      {
        username: user,
      },
      {
        purchasedCourses: [...userObj.purchasedCourses, course._id],
      },
    );

    res.status(200).send({
      message: "Course purchased successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
});

module.exports = router;
