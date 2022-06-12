const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concerts.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/concerts', () => {

  it('/ should insert new document to db and return success', async () => {
    const res = await request(server).post('/api/concerts').send({ performer: 'Performer #1', genre: 'rock', price: 25, day: 3 });
    const newConcert = await Concert.findOne({ performer: 'Performer #1', genre: 'rock' });
    expect(res.status).to.be.equal(200);
    expect(newConcert).to.not.be.null;
  });

  after(async () => {
      await Concert.deleteMany();
  });
});