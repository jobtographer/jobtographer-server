// require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const app = require('../../lib/app');
const { getJob } = require('../data_helpers/data-helpers');

jest.mock('../../lib/middleware/ensure-auth');
jest.mock('../../lib/services/auth.js');

// const createJob = job => {
//   return request(app) 
//     .post('app/v1/jobs')
//     .send(job)
//     .then(res => res.body);
// };

describe('Jobs route', () => {
  // beforeAll(() => {
  //   return connect();
  // });
  // beforeEach(() => {
  //   return mongoose.connection.dropDatabase();
  // });
  // afterAll(() => {
  //   return mongoose.connection.close();
  // });

  const newJob = {
    title: 'CEO',
    company: 'Microsoft',
    location: '80014',
    jobDescriptionText: 'this is a cool job',
    jobUrl: 'www.microsoft.com',
    salary: '$$$10000000000000000000000000',
    tracking: 'jobOffer',
    active: true
  };

  it('can POST a job', async() => {
    const job = await request(app)
      .post('/api/v1/jobs')
      .send(newJob);
    expect(job.body).toEqual({ ...newJob, __v: 0, _id: expect.any(String), date: expect.any(String), author: '12345' });
  });

  it('gets all jobs', async() => {

    const job1 = await request(app)
      .post('/api/v1/jobs')
      .send(newJob);
    const job2 = await request(app)
      .post('/api/v1/jobs')
      .send(newJob);

    const allJobs = await request(app)
      .get('/api/v1/jobs');

    expect(allJobs.body).toEqual([
      { ...job1.body, _id: job1.body._id, date: job1.body.date, author: '12345' }, 
      { ...job2.body, _id: job2.body._id, date: job2.body.date, author: '12345' }
    ]);
  });
});
