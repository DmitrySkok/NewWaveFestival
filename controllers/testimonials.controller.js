const Testimonials  = require('../models/testimonials.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonials.find());
  }
  catch(err) {
    res.status(500).json({message: err});
  }
};

exports.getRandom = async (req, res) => { 
  try {
    const count = await Testimonials.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const tesml = await Testimonials.findOne().skip(rand);
    if(!tesml) res.status(404).json({ message: 'Not found' });
    else res.json(tesml);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getById = async (req, res) => { 
  try {
    const tesml = await Testimonials.findById(req.params.id);
    if(!tesml) res.status(404).json({ message: 'Not found' });
    else res.json(tesml);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postNewTestimonial = async (req, res) => { 
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonials({ author: author, text: text });
    await newTestimonial.save();
    res.status(200).json(newTestimonial);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putTestimonial = async (req, res) => { 
  const { author, text } = req.body;
  try {
    const tesml = await Testimonials.findById(req.params.id);
    if(tesml) {
      await Testimonials.updateOne({ _id: req.params.id }, { $set: { author: author, text: text }});
      res.status(200).json(tesml);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delTestimonial = async (req, res) => { 
  try {
    const tesml = await Testimonials.findById(req.params.id);
    if(tesml) {
      await Testimonials.deleteOne({ _id: req.params.id });
      res.status(200).json(tesml);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};