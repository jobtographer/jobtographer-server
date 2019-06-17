const { Router } = require('express');
const Job = require('../models/Job');
const ensureAuth = require('../middleware/ensure-auth');
const { joinUsers } = require('../services/auth');

module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
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

    console.log(req.user, 'REQ.USER');

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
  .get('/', ensureAuth(), (req, res, next) => {
    console.log(joinUsers, 'JOIN USERS');
    Job
      .find({
        author: req.user.sub
      })
      .lean()
      .then(jobs => joinUsers(jobs, 'author'))
      .then(jobs => res.send(jobs))
      .catch(next);
  });
