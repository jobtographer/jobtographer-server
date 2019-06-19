const { Router } = require('express');
const Job = require('../models/Job');
const ensureAuth = require('../middleware/ensure-auth');
const { joinUsers } = require('../services/auth');

module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
    const {
      title, 
      company,
      jobLocation, 
      jobDescriptionText,
      jobUrl, 
      salary, 
      tracking, 
      active 
    } = req.body;

    Job
      .create({ 
        title, 
        company,
        jobLocation, 
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
    Job
      .find({
        author: req.user.sub
      })
      .lean()
      .then(jobs => joinUsers(jobs, 'author'))
      .then(jobs => res.send(jobs))
      .catch(next);
  })
  .get('/:id', ensureAuth(), (req, res, next) => {
    const { id } = req.params;
    Job
      .findById(id)
      .lean()
      .then(job => joinUsers([job], 'author'))
      .then(job => res.send(job[0]))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const { 
      title, 
      company, 
      active, 
      jobDescriptionText, 
      jobUrl, 
      salary, 
      jobLocation, 
      tracking, 
      __v 
    } = req.body;

    const updateObj = {};
    if(title) updateObj.title = title;
    if(company) updateObj.company = company;
    if(active === true || active === false) updateObj.active = active;
    if(jobDescriptionText) updateObj.jobDescriptionText = jobDescriptionText;
    if(jobUrl) updateObj.jobUrl = jobUrl;
    if(salary) updateObj.salary = salary;
    if(jobLocation) updateObj.jobLocation = jobLocation;
    if(tracking) updateObj.tracking = tracking;
    if(__v) updateObj.__v = __v;

    Job
      .findByIdAndUpdate(id, updateObj, { new: true })
      .lean()
      .then(job => joinUsers([job], 'author'))
      .then(job => res.send(job[0]))
      .catch(next);
  })
  .delete('/:id', (req, res, next)=>{
    Job 
      .findByIdAndDelete(req.params.id)
      .lean()
      .select({
        _id: true
      })
      .then(deleted=>res.send(deleted))
      .catch(next);
  });

