const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 100,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  company: {
    type: String,
    maxlength: 100,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  jobDescriptionText: {
    type: String
  },
  jobUrl: {
    type: String
  },
  salary: {
    type: String,
  },
  location: {
    type: String,
    required: false,
  },
  tracking: {
    type: String,
    enum: [
      'interested',
      'haveApplied',
      'phoneInterviewed',
      'technicalInterviewed',
      'inPersonInterviewed',
      'jobOffer'
    ]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema);
