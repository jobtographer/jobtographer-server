const request = require('supertest');
const app = require('../../lib/app');
const { getJob } = require('../data_helpers/data-helpers');

jest.mock('../../lib/middleware/ensure-auth');
jest.mock('../../lib/services/auth.js');

describe('notes route', () => {
  it('can create a note', async() => {
    const job = await getJob();
    const jobId = job[0]._id;
    const noteBody = {
      title: 'note title',
      body: 'note body',
      job: jobId,
      author: '12345'
    };

    const newNote = await request(app)
      .post('/api/v1/notes')
      .send(noteBody);

    expect(newNote.body).toEqual(
      { ...noteBody, __v:0, _id: expect.any(String) }
    );
  });
  it('can find a note by job id', ()=>{
    
  })
});
