const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 100,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  job: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Note', noteSchema);
