const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/userThoughtDB', {
    useNewUrlParseer: true,
    useUnifiedTolpology: true
})

module.exports = mongoose.connection