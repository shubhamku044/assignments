const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/users", userRouter);

(() => {
  mongoose
    .connect("mongodb://localhost:27017/week03")
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.log("Error connecting to the database");
      console.log(err);
    });
})();

app.get("/health", (req, res) => {
  res.send("Server is running");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
