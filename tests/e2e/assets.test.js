const request = require('supertest');
const app = require('../../lib/app');
const { getAsset } = require('../data_helpers/data-helpers');

jest.mock('../../lib/middleware/ensure-auth');
jest.mock('../../lib/services/auth.js');

describe('assets route', () => {
  it('can create a resume', async()=>{
    const newResume = {
      title:'best resume',
      body:'check out my skills',
      assetType: 'resume'
    };
    const resume = await request(app)
      .post('/api/v1/assets')
      .send(newResume);

    expect(resume.body).toEqual({ ...newResume, _id: expect.any(String), __v: 0, author: '12345' });
  });

  it('gets all resumes by user', async() => {
    const resumes = await request(app)
      .get('/api/v1/assets?assetType=resume');

    expect(resumes.body[0]).toEqual({
      title: expect.any(String),
      body: expect.any(String),
      assetType: 'resume',
      author: '12345',
      __v: 0,
      _id: expect.any(String)
    });
    
    expect(resumes.body).toHaveLength(5);
  });

  it('gets all cover letters by user', async() => {
    const resumes = await request(app)
      .get('/api/v1/assets?assetType=coverLetter');

    expect(resumes.body[0]).toEqual({
      title: expect.any(String),
      body: expect.any(String),
      assetType: 'coverLetter',
      author: '12345',
      __v: 0,
      _id: expect.any(String)
    });

    expect(resumes.body).toHaveLength(5);
  });

  it('gets an asset by id', async() => {
    const resumeSeed = await getAsset();
    const resume = await request(app)
      .get(`/api/v1/assets?id=${resumeSeed[1]._id}`);

    expect(resume.body[0]).toEqual({
      title: expect.any(String),
      body: expect.any(String),
      assetType: expect.any(String),
      author: '12345',
      __v: 0,
      _id: resumeSeed[1]._id
    });
  });

  it('can delete a asset by id', async()=>{
    const assets = await getAsset();
    const assetId = assets[0]._id;

    const deleted = await request(app)
      .delete(`/api/v1/assets/${assetId}`);

    expect(deleted.body).toEqual({
      _id:assetId
    });

  });
});


