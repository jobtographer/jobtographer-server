
const { Router } = require('express');
const Note = require('../models/Note');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
    const {
      title,
      body,
      author,
      job
    } = req.body;

    Note
      .create({
        title,
        body,
        author,
        job
      })
      .then(note=>res.send(note))
      .catch(next);
  });
