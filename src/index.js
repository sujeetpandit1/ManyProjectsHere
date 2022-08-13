const express = require('express'); //express  is a frame work of node.js web application and it is a labrary  of other node web frame work 
const app = express(); 
const mongoose = require('mongoose');
const multer= require('multer')

app.use(multer().any())


const route = require('./routes/route')
app.use(express.json()); // it parses in comming req wit  JSON payload it based on body parser

mongoose.connect('mongodb+srv://isuzu:Arjun123@cluster0.rs68oil.mongodb.net/MiniBlog')
    .then(() => console.log('MongoDB is Connected'))
    .catch(error => console.log(error));



app.use('/', route);



let PORT = process.env.PORT || 3000
app.listen(PORT, function () {
    console.log(`Express is running on PORT ${PORT}`)});