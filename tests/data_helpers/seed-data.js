const chance = require('chance').Chance();
const Job = require('../../lib/models/Job');
const Note = require('../../lib/models/Note');
const Asset = require('../../lib/models/Asset');

module.exports = async({ jobCount = 5, noteCount = 60, resumeCount = 5 } = {}) => {
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

  //eslint-disable-next-line no-unused-vars
  const note = await Note
    .create(notesArray);

  const resumes = [...Array(resumeCount)].map(() => {
    const job = chance.pickone(jobs);
    
    return {
      title: chance.profession(),
      body: chance.word(),
      assetType: 'resume',
      author: job.id
    };
  });
   
  return await Asset
    .create(resumes);

};

