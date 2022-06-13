const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

//import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res, next) => {
  req.io = io;
  next();
});

//routes
app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertsRoutes);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
})

// connects our backend code with the database
const NODE_ENV = process.env.NODE_ENV;
let dbURI = '';

if(NODE_ENV === 'production') dbURI = 'mongodb+srv://admin:admin@cluster0.bsu3lwc.mongodb.net/?retryWrites=true&w=majority';
else if(NODE_ENV === 'test') dbURI = 'mongodb://localhost:27017/newWaveDBtest';
else dbURI = 'mongodb://localhost:27017/NewWaveDB';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  if (!NODE_ENV) console.log('Connected to the database');
});

db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  if (!NODE_ENV) console.log('Server is running on port: 8000');
});

const io = socket(server, {
  allowEIO3: true
});

module.exports = server;