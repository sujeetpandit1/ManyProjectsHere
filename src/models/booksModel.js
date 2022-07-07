const mongoose = require('mongoose')
const moment = require('moment')

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    excerpt: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: [String],
        required: true
    },
    reviews: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    releasedAt: {
        type: Date,
        default: moment().format("YYYY-MM-DD"),
        required: true,
    },
    deletedAt: { type: Date }
    //releasedAt:moment(releasedAt).toISOString()
}, { timestamps: true });

module.exports = mongoose.model('book', bookSchema);