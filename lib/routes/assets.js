const { Router } = require('express');
const Asset = require('../models/Asset');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) =>{
    const {
      title,
      body,
      assetType,
    } = req.body;

    Asset
      .create({
        title,
        body,
        assetType,
        author: req.user.sub
      })
      .then(resume => res.send(resume))
      .catch(next);
  })
  .get('/', ensureAuth(), (req, res, next) => {
    let queryObj = {};
    if(req.query.assetType) queryObj = { assetType: req.query.assetType, author: req.user.sub };
    if(req.query.id) queryObj = { _id: req.query.id, author: req.user.sub };
    Asset
      .find(queryObj)
      .lean()
      .then(assets=>res.send(assets))
      .catch(next);
  })
  .delete('/:id', ensureAuth(), (req, res, next) => {
    const id = req.params.id;
    Asset
      .findByIdAndDelete(id)
      .lean()
      .select({
        _id: true
      })
      .then(deleted => res.send(deleted))
      .catch(next);
  })
  
;


