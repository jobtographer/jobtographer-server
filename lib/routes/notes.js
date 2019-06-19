
const { Router } = require('express');
const Note = require('../models/Note');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
    const {
      title,
      body,
      job
    } = req.body;

    Note
      .create({
        title,
        body,
        author: req.user.sub,
        job
      })
      .then(note=>res.send(note))
      .catch(next);
  })
  .get('/:id', ensureAuth(), (req, res, next) => {
    Note
      .find({
        job:req.params.id
      })
      .lean()
      .then(notes => res.send(notes))
      .catch(next);
  })
  .delete('/:id', (req, res, next) =>{
    Note
      .findByIdAndDelete(req.params.id)
      .lean()
      .select({
        _id: true
      })
      .then(deleted=>res.send(deleted))
      .catch(next);
  })

;
