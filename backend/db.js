const mongoose = require('mongoose');

var mongoURL = 'mongodb+srv://gaurish:bhavya@cluster0.3iqbaxu.mongodb.net/mern-bakers-nest';

mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true});

var db = mongoose.connection;

db.on('connected', ()=>{
    console.log('Database connected successfully.');
})

db.on('error', ()=>{
    console.log('MongoDB connection failed');
})

module.exports = mongoose;