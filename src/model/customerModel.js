const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid')



const customerModel = new mongoose.Schema({

    firstName:{type: String,required: true, trim: true },
    lastName :{type: String,required: true, trim: true },
    mobileNumber:{type: String,required: true, length: 10, unique:true, trim:true},
    DOB:{type: String, required: true, trim: true },
    emailID:{type: String,unique:true, required: true, trim: true },
    address:{
        street:{type:String, required: true, trim: true},
        city: {type:String, required: true, trim: true},
        state:{type:String, required: true, trim: true},
        pinCode: {type:String, required: true, trim: true}
       
    },
    customerID:{type: String, default: uuidv4()},
    status:{type: String, enum:["Active" , "Inactive"], required: true, trim: true }
})

module.exports=mongoose.model('Customer', customerModel)