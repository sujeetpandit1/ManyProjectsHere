const dotenv = require('dotenv');
const express= require('express')
const mongoose = require('mongoose');
const app = express();
dotenv.config();
const multer = require('multer')
const route=require('./route/route')
const cors = require('cors')


app.use(express.json()); 
app.use(multer().any())
app.use(cors())

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {console.log('MongoDB is Connected')})
  .catch((err) => {console.log(err.message)});

app.use('/', route)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});