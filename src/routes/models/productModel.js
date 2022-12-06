const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    name: {
        type: String,
        unique: true,
        trim: true
    },
    price:{
        type: Number,
    }
    
}, {timestamps:true});


module.exports = mongoose.model("Product", productSchema);