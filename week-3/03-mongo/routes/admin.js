const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.create({ username, password });
    res.status(201).json(admin);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get-all-admins", async (req, res) => {
  try {
    const admins = await Admin.find({})
      .select("-password")
      .populate({
        path: "courses",
        model: "Course",
        match: {
          admin: { $eq: this._id },
        },
      })
      .exec();

    res.status(200).json({
      data: admins,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Couldn't find all admins",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  try {
    const { username } = req.headers;
    const user = await Admin.findOne({ username });
    const { title, description, price, imageLink } = req.body;
    const course = await Course.create({
      title,
      description,
      price,
      imageLink,
      admin: user._id,
    });

    res.status(201).json({
      message: "Course created successfully",
      data: course,
    });
  } catch (err) {
    res.status(404).json({
      message: "Couldn't find all admins",
    });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
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

module.exports = router;
