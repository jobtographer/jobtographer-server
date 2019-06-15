const { Router } = require('express');
const Job = require('../models/Job');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      title, 
      company,
      location, 
      jobDescriptionText,
      jobUrl, 
      salary, 
      tracking, 
      active 
    } = req.body;

    console.log(req, 'REQ.USER');

    Job
      .create({ 
        title, 
        company,
        location, 
        jobDescriptionText, 
        jobUrl, 
        salary, 
        tracking,
        author: req.user.sub, 
        active 
      })
      .then(job => res.send(job))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Job
      .find()
      .lean()
      .then(jobs => res.send(jobs))
      .catch(next);
  });
