const Concerts  = require('../models/concerts.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concerts.find({}));
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

exports.getByPerformer = async (req, res) => {
  try {
    const performer = req.params.performer;
    const getPerformer = await Concerts.find({ performer: performer });
    if (!getPerformer) res.status(404).json({ message: 'Not found' });
    else res.json(getPerformer);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByGenre = async (req, res) => {
  try {
    const genre = req.params.genre;
    const getGenre = await Concerts.find({ genre: genre });
    if (!getGenre) res.status(404).json({ message: 'Not found' });
    else res.json(getGenre);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.sortByPrice = async (req, res) => {
  try {
    const priceMin = req.params.price_min;
    const priceMax = req.params.price_max;
    const concert = await Concerts.find({
      price: { $gte: priceMin, $lte: priceMax },
    });
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.sortByDay = async (req, res) => {
  try {
    const day = req.params.day;
    const getDay = await Concerts.find({ day: day });
    if (!getDay) res.status(404).json({ message: 'Not found' });
    else res.json(getDay);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};