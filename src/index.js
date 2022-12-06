const express = require('express');
const app = express(); 
const mongoose = require('mongoose');
const route = require('./routes/route')
app.use(express.json()); 




mongoose.connect('mongodb+srv://isuzu:xxxxxxxx@cluster0.rs68oil.mongodb.net/Assignment1')
    .then(() => console.log('MongoDB is Connected'))
    .catch(error => console.log(error));


  
app.use('/', route);



let PORT = process.env.PORT || 3000
app.listen(PORT, function () {
    console.log(`Express is running on PORT ${PORT}`)
});