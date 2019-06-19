const chance = require('chance').Chance();
const Job = require('../../lib/models/Job');


module.exports = ({ jobCount = 5, noteCount = 60 } = {}) => {
  const jobs = [...Array(jobCount)].map(() => ({
    title: chance.profession(),
    author: chance.phone(),
    company: chance.company(),
    active: chance.bool(),
    jobDescriptionText: chance.word(),
    jobUrl: chance.word(),
    salary: chance.word(),
    location: chance.zip(),
    tracking: 'interested',
  }));
  
  return Job
    .create(jobs);
};

