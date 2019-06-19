const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 100,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  assetType: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
  }
});

module.exports  = mongoose.model('Asset', assetSchema);
