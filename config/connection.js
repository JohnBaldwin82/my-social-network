const mongoose = require("mongoose");

const myConnection =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/myStudentDB";

mongoose.connect(myConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connect(myConnection, { debug: true });

module.exports = mongoose.connection;
