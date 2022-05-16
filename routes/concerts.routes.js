const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const db = require('../db.js');

const concerts =  db.concerts;

router.route('/concerts').get((req, res) => {
  res.send(concerts);
});

router.route('/concerts/:id').get((req, res) => {
  const currentUser = concerts.find(user => user.id == req.params.id);
  if (currentUser) {
    res.send(currentUser);
  } 
  else if (req.params.id === 'random') {
    const item = concerts[Math.floor(Math.random()*concerts.length)];
    res.send(item);
  } else { 
    res.send(`<h3>No user with id = ${req.params.id}</h3>`) 
  }
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  if(performer && genre && price && day && image ) {
    const newConcert = {
      id: uuidv4(),
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image,
    }
    concerts.push(newConcert);
    res.send({ message: 'OK' })
  }
  else {
    res.send({ message: 'ERROR' });
  }
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const concert = concerts.find(concert => concert.id == req.params.id);
  if (concert) {
    concert.performer = performer;
    concert.genre = genre;
    concert.price = price;
    concert.day = day;
    concert.image = image;
    res.send({ message: 'OK' });
  } else {
    res.send({ message: 'ERROR' });
  }
});

router.route('/concerts/:id').delete((req, res) => {
  const concert = concerts.find(concert => concert.id == req.params.id);
  if (concert) {
    const props = Object.getOwnPropertyNames(concert);
    for (let i = 0; i < props.length; i++) {
      delete concert[props[i]];
    }
    res.send({ message: 'OK' });
  } else {
    res.send({ message: 'ERROR' });
  }
});

module.exports = router;