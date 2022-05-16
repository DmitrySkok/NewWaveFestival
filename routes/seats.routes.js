const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const db = require('../db.js');

const seats =  db.seats;

router.route('/seats').get((req, res) => {
  res.send(seats);
});

router.route('/seats/:id').get((req, res) => {
  const currentUser = seats.find(user => user.id == req.params.id);
  if (currentUser) {
    res.send(currentUser);
  } 
  else if (req.params.id === 'random') {
    const item = seats[Math.floor(Math.random()*seats.length)];
    res.send(item);
  } else { 
    res.send(`<h3>No user with id = ${req.params.id}</h3>`) 
  }
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  if(day && seat && client && email ) {
    const newSeat = {
      id: uuidv4(),
      day: day,
      seat: seat,
      client: client,
      email: email
    }
    seats.push(newSeat);
    res.send({ message: 'OK' })
  }
  else {
    res.send({ message: 'ERROR' });
  }
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const updatedSeat = seats.find(seat => seat.id == req.params.id);
  if (newSeat) {
    updatedSeat.day = day;
    updatedSeat.seat = seat;
    updatedSeat.client = client;
    updatedSeat.email = email;
    res.send({ message: 'OK' });
  } else {
    res.send({ message: 'ERROR' });
  }
});

router.route('/seats/:id').delete((req, res) => {
  const seat = seats.find(seat => seat.id == req.params.id);
  if (seat) {
    const props = Object.getOwnPropertyNames(seat);
    for (let i = 0; i < props.length; i++) {
      delete seat[props[i]];
    }
    res.send({ message: 'OK' });
  } else {
    res.send({ message: 'ERROR' });
  }
});

module.exports = router;