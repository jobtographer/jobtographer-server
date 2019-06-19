const request = require('supertest');
const app = require('../../lib/app');
const { getJob, getNote } = require('../data_helpers/data-helpers');

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
  it('can find a note by job id', async()=>{
    const job = await getJob();
    const jobId = job[0]._id;
    const foundNote = await request(app)
      .get(`/api/v1/notes/${jobId}`);
    
    expect(foundNote.body[0]).toEqual({
      title: expect.any(String),
      body: expect.any(String),
      author: job[0].author,
      job: jobId,
      __v: 0,
      _id: expect.any(String)
    });
  });
  it('can delete a note by id', async()=>{
    const notes = await getNote();
    console.log('noted', notes);
    const noteId = notes[0]._id;
    const deletedNote = await request(app)
      .delete(`/api/v1/notes/${noteId}`);

    expect(deletedNote.body).toEqual({
      _id:expect.any(String)
    });
  });
});
