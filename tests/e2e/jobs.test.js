const request = require('supertest');
const app = require('../../lib/app');
const { getJob } = require('../data_helpers/data-helpers');

jest.mock('../../lib/middleware/ensure-auth');
jest.mock('../../lib/services/auth.js');


describe('Jobs route', () => {

  const newJob = {
    title: 'CEO',
    company: 'Microsoft',
    jobLocation: '80014',
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

  it('can get a job by id', async()=>{
    const jobId = await getJob();
    const job = await request(app)
      .get(`/api/v1/jobs/${jobId[0]._id}`);
 
    expect(job.body).toEqual({
      ...jobId[0],
      date: expect.any(String),
      author: '12345',
      __v: 0,
      _id: jobId[0]._id
    });
  });
  it('can update a job with id', async()=>{
    const jobId = await getJob();
    const updateJob = await request(app)
      .patch(`/api/v1/jobs/${jobId[0]._id}`)
      .send({
        title:'better title',
        author:'better author',
        company:'better company',
        active: false,
        jobDescriptionText: 'better description',
        jobUrl:'www.better.com',
        salary: '272829',
        
        jobLocation: 'better place',
        tracking: 'jobOffer',
      });

    expect(updateJob.body).toEqual({
      ...jobId[0],
      title:'better title',
      author:'12345',
      company:'better company',
      active: false,
      jobDescriptionText: 'better description',
      jobUrl:'www.better.com',
      salary: '272829',
      jobLocation: 'better place',
      tracking: 'jobOffer'
    });
  });
  it('can delete a job by id', async()=>{
    const job = await getJob();
    const jobId = job[0]._id;
    const deletedJob = await request(app)
      .delete(`/api/v1/jobs/${jobId}`);

    expect(deletedJob.body).toEqual({
      _id:expect.any(String)
    });
      
  });
});

