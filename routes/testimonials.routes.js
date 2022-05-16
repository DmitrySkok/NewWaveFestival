const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const db = require('../db.js');

const testimonials =  db.testimonials;

router.route('/testimonials').get((req, res) => {
  res.send(testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
  const currentUser = testimonials.find(user => user.id == req.params.id);
  if (currentUser) {
    res.send(currentUser);
  } 
  else if (req.params.id === 'random') {
    const item = testimonials[Math.floor(Math.random()*testimonials.length)];
    res.send(item);
  } else { 
    res.send(`<h3>No user with id = ${req.params.id}</h3>`) 
  }
});

/* router.route('/testimonials/:id').get((req, res) => {
  const item = testimonials[Math.floor(Math.random()*testimonials.length)];
  res.send(`${item}`);
}); */

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  if(author && text ) {
    const newUser = {
      id: uuidv4(),
      author: author,
      text: text
    }
    testimonials.push(newUser);
    res.send({ message: 'OK' })
  }
  else {
    res.send({ message: 'ERROR' });
  }
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const user = testimonials.find(user => user.id == req.params.id);
  if (user) {
    user.author = author;
    user.text = text;
    res.send({ message: 'OK' });
  } else {
    res.send({ message: 'ERROR' });
  }
});

router.route('/testimonials/:id').delete((req, res) => {
  const user = testimonials.find(user => user.id == req.params.id);
  if (user) {
    const props = Object.getOwnPropertyNames(user);
    for (let i = 0; i < props.length; i++) {
      delete user[props[i]];
    }
    res.send({ message: 'OK' });
  } else {
    res.send({ message: 'ERROR' });
  }
});

module.exports = router;