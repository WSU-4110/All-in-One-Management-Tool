require('dotenv').config();
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'StudentPlannerDB'; 

app.use(express.json());

// MongoDB connection
let db;
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db(dbName);

    // Starting the server should be inside the .then block
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('An error occurred connecting to MongoDB: ', err);
  });

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Student Planner API!' });
});