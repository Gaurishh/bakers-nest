const mongoose = require('mongoose');

// Use environment variable for MongoDB URL, with localhost fallback for development
var mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/bakers-nest';

mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true});

var db = mongoose.connection;

db.on('connected', ()=>{
    console.log('Database connected successfully.');
})

db.on('error', ()=>{
    console.log('MongoDB connection failed');
})

module.exports = mongoose;