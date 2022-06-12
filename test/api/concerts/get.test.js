const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concerts.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const testConcertOne = new Concert({ _id: '4bcb88ddf33d498f917770ef', performer: 'Performer #1', genre: 'rock', price: 25, day: 3, image: 'image1.jpg' });
    await testConcertOne.save();

    const testConcertTwo = new Concert({ _id: '318f6458ea6d11ec8fea0242', performer: 'Performer #2', genre: 'pop', price: 35, day: 1, image: 'image2.jpg' });
    await testConcertTwo.save();

    const testConcertThree = new Concert({ _id: 'd5f3500d9eff436683894739', performer: 'Performer #2', genre: 'rock', price: 45, day: 2, image: 'image3.jpg' });
    await testConcertThree.save();
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);
  });

  it('/:id should return concert by :id ', async () => {
    const res = await request(server).get('/api/concerts/318f6458ea6d11ec8fea0242');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/performer/:performer should return an array with concerts sorted by performer', async () => {
    const res = await request(server).get('/api/concerts/performer/Performer #2');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length)
  });

  it('/genre/:genre should return an array with concerts sorted by genre', async () => {
    const res = await request(server).get('/api/concerts/genre/rock');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/day/:day should return an empty array when there is no matching data in db ', async () => {
    const res = await request(server).get('/api/concerts/day/4');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(0);
    expect(res.body).to.not.be.null;
  });

  it('/day/:day should return an array with proper amount of concerts sorted by day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);;
  });


  it('/price/:price_min/:price_max should return an array with concerts sorted by price', async () => {
    const res = await request(server).get('/api/concerts/price/40/50');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  after(async () => {
    await Concert.deleteMany();
  });
});