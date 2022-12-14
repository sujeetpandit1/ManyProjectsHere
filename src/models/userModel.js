const mongoose =require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    photo:{
        type:String,
        required:false
    },
    document:{
        type:String,
        required: false
    }
}, {timestamps: true})

module.exports=mongoose.model('User', userSchema);