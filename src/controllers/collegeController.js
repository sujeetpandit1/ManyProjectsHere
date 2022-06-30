const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

//create college API
const createCollege = async function (req, res) {
  try {
    let data = req.body;
    let savedData = await collegeModel.create(data);
    res.status(201).send({ status: true, data: savedData });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};
//get college details
const getCollege = async function (req, res) {
  try {
    let collegename = req.query.collegeName
    let collegeName = collegename.toLowerCase()
    //validation start
    if (!collegeName) return res.status(400).send({ status: false, msg: `Please enter collegeName in query` })

    let thisCollege = await collegeModel.findOne({ name: collegeName, isDeleted: false }).select({ name: 1, fullName: 1, logoLink: 1, _id: 1 });

    if (!thisCollege) return res.status(404).send({ status: false, msg: `No college with name ${collegeName} found ` })

    let internsofCollege = await internModel.find({ isDeleted: false, collegeId: thisCollege._id }).select({ name: 1, email: 1, mobile: 1 });

    if (internsofCollege.length == 0) return res.status(404).send({ status: false, msg: `No interns found with college name ${collegeName}` })
    let interns = [];
    // console.log({ ...thisCollege })
    for (let i = 0; i < internsofCollege.length; i++) {
      interns.push(internsofCollege[i]);
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
