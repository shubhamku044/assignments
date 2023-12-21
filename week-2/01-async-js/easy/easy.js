function counter(count, callback) {
  callback(count);
  if (count > 0) {
    setTimeout(function () {
      counter(count - 1, callback);
    }, 1000);
  }
}

module.exports = counter;
