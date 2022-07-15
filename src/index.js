const express = require("express")
const bodyParser = express.json()
// const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express()
const multer=require('multer')
const aws=require('aws-sdk')
const route = require("./routes/route")

app.use(bodyParser)
app.use(multer().any())

mongoose.connect("mongodb+srv://isuzu:Arjun123@cluster0.rs68oil.mongodb.net/BookManagement", { useNewUrlParser: true })
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use("/", route)



app.listen(process.env.PORT || 3000, function () { console.log("Express is running on port " + (process.env.PORT || 3000)) });

