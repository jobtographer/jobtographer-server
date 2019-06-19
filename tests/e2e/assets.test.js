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
});
