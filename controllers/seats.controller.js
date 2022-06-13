const Seats  = require('../models/seats.model');
const sanitize = require('mongo-sanitize');


exports.getAll = async (req, res) => {
  try {
    res.json(await Seats.find());
  }
  catch(err) {
    res.status(500).json({message: err});
  }
};

exports.getRandom = async (req, res) => { 
  try {
    const count = await Seats.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const seat = await Seats.findOne().skip(rand);
    if(!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getById = async (req, res) => { 
  try {
    const seat = await Seats.findById(req.params.id);
    if(!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postNewSeat = async (req, res) => { 
  try {
    const { day, seat, client, email } = sanitize(req.body);
    const newSeat = new Seats({ day: day, seat: seat,  client: client, email: email});
    await newSeat.save();
    res.status(200).json(newSeat);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putSeat = async (req, res) => { 
  const { day, seat, client, email } = sanitize(req.body);
  try {
    const updSeat = await Seats.findById(req.params.id);
    if(updSeat) {
      await Seats.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat,  client: client, email: email}});
      res.status(200).json(updSeat);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delSeat = async (req, res) => { 
  try {
    const seat = await Seats.findById(req.params.id);
    if(seat) {
      await Seats.deleteOne({ _id: req.params.id });
      res.status(200).json(seat);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};