const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concerts.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/concerts', () => {
  before(async () => {
    const testConcert = new Concert({ _id: '4bcb88ddf33d498f917770ef', performer: 'Performer #1', genre: 'rock', price: 25, day: 3, image: 'image1.jpg' });
    await testConcert.save();
  });

    it('/:id should delete chosen document and return success', async () => {
      const res = await request(server).delete('/api/concerts/4bcb88ddf33d498f917770ef');
      const deletedConcert = await Concert.findOne({ _id: '4bcb88ddf33d498f917770ef' });
      expect(res.status).to.be.equal(200);
      expect(deletedConcert).to.be.null;
    });
    after(async () => {
        await Concert.deleteMany();
    });
});