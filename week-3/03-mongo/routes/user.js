const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      data: courses,
    });
  } catch (err) {
    res.status(404).json({
      message: "Couldn't find all courses",
    });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  try {
    const { username } = req.headers;
    const user = await User.findOne({ username });
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      res.status(404).json({
        message: "Course not found",
      });
      return;
    }
    user.purchasedCourses.push(course);
    await user.save();
    res.status(200).json({
      message: "Course purchased successfully",
    });
  } catch (err) {
    res.status(404).json({
      message: "Couldn't purchase course",
    });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  try {
    const { username } = req.headers;
    const user = await User.findOne({ username }).populate("purchasedCourses");
    res.status(200).json({
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      message: "Couldn't find purchased courses",
    });
  }
});

router.get("/get-all-users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      data: users,
    });
  } catch (err) {
    res.status(404).json({
      message: "Couldn't find all users",
    });
  }
});

module.exports = router;
