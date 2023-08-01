const mongoose = require('mongoose');

const connection =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/myStudentDB";

mongoose.connect(connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection