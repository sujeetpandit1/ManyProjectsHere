const mongoose = require("mongoose")
const autoIncrement = require ('mongoose-sequence')(mongoose);



const cardModel = new mongoose.Schema({

    _id: Number,

    cardNumber:{type: String, unique:true, required: true, trim: true }, 
    cardType :{type: String,required: true, trim: true },
    customerName:{type:String, required: true, trim: true},
    status:{type: String, enum:["Active" , "Inactive"], default: "Active", required: true, trim: true },
    vision:{type: String, required: true, trim: true },
    customerID:{type: String, refer: "customerID"}


    
},{ _id: false });

cardModel.plugin(autoIncrement)
module.exports=mongoose.model('Card', cardModel)

