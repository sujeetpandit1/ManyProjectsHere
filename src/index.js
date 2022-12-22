const express= require('express');
const app= express();
const dotenv=require('dotenv')
dotenv.config();
const mongoose=require('mongoose')
const route= require('./routes/route')



app.use(express.json()); 



mongoose.connect(process.env.MONGODB_URI)
  .then(() => {console.log('MongoDB is Connected')})
  .catch((err) => {console.log(err.message)});

app.use('/', route)

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});




