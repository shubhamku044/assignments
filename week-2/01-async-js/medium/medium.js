const fs = require("fs");
const counter = require("../easy/easy");

function removeExtraSpaces(oldFilePath, newFilePath) {
  fs.readFile(oldFilePath, "utf-8", (err, data) => {
    const content = data.replace(/\s\s+/g, " ");
    fs.writeFile(newFilePath, content, (err) => {
      if (err) throw err;
    });
  });
}

removeExtraSpaces("./a.txt", "./a-update.txt");

// counter(5, (res) => console.log(res));
const timeLogger = (ampm = false) => {
  const date = new Date();
  const currHrs = date.getHours();
  const currMinutes = date.getMinutes();
  let currSeconds = date.getSeconds();

  let i = 1;
  counter(i, (res) => {
    if (res >= 1) {
      if (ampm) {
        let isAmOrPm = currHrs >= 12 ? "PM" : "AM";
        console.log(
          `${currHrs % 12 <= 9 ? "0" + (currHrs % 12) : currHrs % 12}:${
            currMinutes <= 9 ? "0" + currMinutes : currMinutes
          }:${
            currSeconds <= 9 ? "0" + currSeconds : currSeconds % 60
          } ${isAmOrPm}`
        );
      } else {
        console.log(
          `${currHrs <= 9 ? "0" + currHrs : currHrs}:${
            currMinutes <= 9 ? "0" + currMinutes : currMinutes
          }:${currSeconds <= 9 ? "0" + currSeconds : currSeconds % 60}`
        );
      }
    } else {
      timeLogger(ampm);
    }
  });
};

timeLogger(false);
