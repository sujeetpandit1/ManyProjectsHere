const mongoose = require('mongoose')
let ObjectId =  mongoose.Schema.Types.ObjectId

const reviewSchema = new mongoose.Schema({
    userId : {
        type : ObjectId,
        ref: 'product'
    },
    description : {
        type :String,
        trim : true
    }
}, {timestamps:true} );

// reviewSchema.virtual("durationweek").get(function(){
//     return this.duration / 7
// })

// reviewSchema.virtual('durationweek', {
//     ref: 'product',
//     localField: 'userId',
//     foreignField: '_id',   
//     justOne: true
// });
// reviewSchema.set('toObject', { virtuals: true });
// reviewSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Review', reviewSchema)