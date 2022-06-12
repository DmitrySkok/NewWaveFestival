const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concerts.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/concerts', () => {
    before(async () => {
        const testConcert = new Concert({ _id: '4bcb88ddf33d498f917770ef', performer: 'Performer #1', genre: 'rock', price: 25, day: 3, image: 'image1.jpg' });
        await testConcert.save();
      });

    it('/:id should update chosen document and return success', async () => {
      const res = await request(server).put('/api/concerts/4bcb88ddf33d498f917770ef').send({ performer: '=Performer #1=' });
      const updatedConcert = await Concert.findOne({ _id: '4bcb88ddf33d498f917770ef' });
      expect(res.status).to.be.equal(200);
      expect(res.body).to.not.be.null;
      expect(updatedConcert.performer).to.be.equal('=Performer #1=');
    });
    
    after(async () => {
        await Concert.deleteMany();
    });
});