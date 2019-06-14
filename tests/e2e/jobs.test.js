require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const app = require('../../lib/app');

// const createJob = job => {
//   return request(app) 
//     .post('app/v1/jobs')
//     .send(job)
//     .then(res => res.body);
// };

describe('Jobs route', () => {
  beforeAll(() => {
    return connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

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
    expect(job.body).toEqual({ ...newJob, __v: 0, _id: expect.any(String), date: expect.any(String) });
  });
});
