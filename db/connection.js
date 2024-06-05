const mongoose = require("mongoose");

const connection = () => {
  return mongoose
    .connect(
      "mongodb+srv://anas:CxzhEb8uKLkKpNlB@cluster0.l1s3u2q.mongodb.net/task"
    )
    .then(() => {
      return true;
    });
};

module.exports = connection;
