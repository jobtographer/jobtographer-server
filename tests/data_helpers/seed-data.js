const chance = require('chance').Chance();
const Job = require('../../lib/models/Job');
const Note = require('../../lib/models/Note');

module.exports = async({ jobCount = 5, noteCount = 60 } = {}) => {
  const jobsArray = [...Array(jobCount)].map(() => ({
    title: chance.profession(),
    author: chance.phone(),
    company: chance.company(),
    active: chance.bool(),
    jobDescriptionText: chance.word(),
    jobUrl: chance.word(),
    salary: chance.word(),
    location: chance.zip(),
    tracking: 'interested'
  }));
  
  const jobs = await Job
    .create(jobsArray);

  const notesArray = [...Array(noteCount)].map(() => {
    const job = chance.pickone(jobs);
    return {
      title: chance.country(),
      job: job._id,
      body: chance.sentence(),
      author: job.author
    };
  });

  return await Note
    .create(notesArray);
};

