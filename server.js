const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');

//routes
app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertsRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to server</h1>');
});

app.use((req, res) => {
  res.status(404).send('<h1>404 not found...</h1>');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});