const Concerts  = require('../models/concerts.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concerts.find());
  }
  catch(err) {
    res.status(500).json({message: err});
  }
};

exports.getRandom = async (req, res) => { 
  try {
    const count = await Concerts.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const concert = await Concerts.findOne().skip(rand);
    if(!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getById = async (req, res) => { 
  try {
    const concert = await Concerts.findById(req.params.id);
    if(!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postNewConcert = async (req, res) => { 
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concerts({ day: day, performer: performer,  genre: genre, image: image, price: price});
    await newConcert.save();
    res.status(200).json(newConcert);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putConcert = async (req, res) => { 
  const { performer, genre, price, day, image } = req.body;
  try {
    const updConcert = await Concerts.findById(req.params.id);
    if(updConcert) {
      await Concerts.updateOne({ _id: req.params.id }, { $set: { day: day, performer: performer,  genre: genre, image: image, price: price}});
      res.status(200).json(updConcert);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delConcert = async (req, res) => { 
  try {
    const concert = await Concerts.findById(req.params.id);
    if(concert) {
      await Concerts.deleteOne({ _id: req.params.id });
      res.status(200).json(concert);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};