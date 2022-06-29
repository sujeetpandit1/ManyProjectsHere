const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

const createCollege = async function (req, res) {
  try {
    let data = req.body;
    let savedData = await collegeModel.create(data);
    res.status(201).send({ status: true, data: savedData });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

const getCollege = async function (req, res) {
  try {
    let collegeName = req.query.collegeName;
    let thisCollege = await collegeModel.findOne({ name: collegeName }).select({ name: 1, fullName: 1, logoLink: 1, _id: 1 });
    let internsofCollege = await internModel.find().select({ name: 1, email: 1, mobile: 1, collegeId: 1 });
    let interns = [];
    for (let i = 0; i < internsofCollege.length; i++) {
      if (internsofCollege[i].collegeId.toString() == thisCollege._id) {
        delete internsofCollege[i]._doc.collegeId;
        interns.push(internsofCollege[i]);
      }
    }
    thisCollege._doc.interns = interns;
    delete thisCollege._doc._id;
    console.log(thisCollege);
    res.status(200).send({ status: true, data: thisCollege });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports = { createCollege, getCollege };
