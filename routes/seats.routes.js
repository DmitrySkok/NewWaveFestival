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
  const isTaken = seats.find(seatData => seatData.seat === seat);
  if (isTaken) { 
   return res.send({ message: 'This seat this seat is already taken' });
  }
  if(seat) {
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
  const index = seats.findIndex(seat => seat.id == req.params.id);
  if (index) {
    seats.splice(index, 1);
    res.send({ message: 'OK' });
  } else {
    res.send({ message: 'ERROR' });
  }
});

module.exports = router;