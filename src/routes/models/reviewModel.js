const mongoose = require("mongoose");
let ObjectId =  mongoose.Schema.Types.ObjectId

const reviewSchema = new mongoose.Schema({
    userId : {
        type : ObjectId,
        ref: 'blog'
    },
    description : {
        type :String,
        trim : true
    }
}, {timestamps:true} );

module.exports = mongoose.model("Review", reviewSchema);