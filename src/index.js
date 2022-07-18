const express=require('express');
const app= express();
const mongoose=require('mongoose');
const route=require('./routes/route')

app.use(express.json());


mongoose.connect('mongodb+srv://RinkiPradhan:moShtmwBC2cEopn2@cluster0.xs93j.mongodb.net/Group61Database')
.then(()=> console.log('MongoDB is Connected'))
.catch(error => console.log(error));

app.use('/', route);

app.listen(process.env.PORT || 3000, function(){
    console.log('Express Running on PORT' + (process.env.PORT || 3000))});


