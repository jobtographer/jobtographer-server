const { Router } = require('express');
const Job = require('../models/Job');

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

    Job
      .create({ title, company,
        location, jobDescriptionText, jobUrl, salary, tracking, active })
      .then(job => res.send(job))
      .catch(next);
  });
