const mongoose = require("mongoose");

const collegeModel = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true},
    fullName: { type: String, required: true, trim: true },
    logoLink: { type: String, required: true, trim: true },
    isDeleted: { type: Boolean, default: false, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("college", collegeModel);
