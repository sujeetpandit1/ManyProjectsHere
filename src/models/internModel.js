const mongoose = require("mongoose");
const ObjectId= mongoose.Schema.Types.ObjectId

const internModel = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true,unique:true },
    mobile: { type: Number, required: true, unique:true },
    collegeId: { type: ObjectId, ref:"college" },
    isDeleted:{type:Boolean,default:false,trim:true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("intern", internModel);
