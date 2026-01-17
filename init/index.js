const mongoose = require('mongoose');
const data = require('./data.js');
const Listing = require('../models/listing.js');

const mongoURI = 'mongodb://localhost:27017/mydatabase';

main()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongoURI);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(data.data);
  console.log("Database Initialized with sample data");
};

initDB();
