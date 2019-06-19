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
    Asset
      .find()
      .lean()
      .then(resumes=>res.send(resumes))
      .catch(next);
  })
; 
