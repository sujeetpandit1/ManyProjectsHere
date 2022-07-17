const collegeModel = require("../models/collegeModel");

// validation functions
const validateData = function (value) {
  if (typeof value === "undefined" || typeof value === null) return false;
  if (!/^[a-zA-Z ._-]*$/.test(value)) return false;
  if (typeof value !== "string" || value.trim().length == 0) return false;
  return true;
};
const validateBody = function (requestBody) {
  if (!requestBody) return false;
  if (Object.keys(requestBody).length == 0) return false;
  return true;
};
const isValidKey = function (value) {
  if (!value) return false;
  return true;
};

const collegeValidation = async function (req, res, next) {
    let data = req.body;

    // Validating empty body
    if (!validateBody(data))
      return res
        .status(400)
        .send({ status: false, msg: "Body cannot be empty" });

    //Validating if name is present and valid ,in lower case and unique
    if (!isValidKey(data.name))
      return res.status(400).send({ status: false, msg: "Please enter name" });
    if (!validateData(data.name))
      return res.status(400).send({ status: false, msg: "Enter a valid name" });
    if (!/^[a-z\s]*$/.test(data.name.trim()))
      return res
        .status(400)
        .send({ status: false, msg: "name should be in lower case" });
    let duplicatename = await collegeModel.find({ name: data.name }); 
    if (duplicatename.length != 0)
      return res
        .status(400)
        .send({ status: false, msg: `${data.name} name is already present` });

    //Validating if fullName is present and valid
    if (!isValidKey(data.fullName))
      return res
        .status(400)
        .send({ status: false, msg: "Please enter fullName" });
    // if (!validateData(data.fullName))
    //   return res
    //     .status(400)
    //     .send({ status: false, msg: "Enter a valid fullName" });

    //Validating if URL is present and valid
    // if (!isValidKey(data.logoLink))
    //   return res
    //     .status(400)
    //     .send({ status: false, msg: "Please enter logoLink" });
    // if (!/^(?:(https:|http:)+\/\/)+[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/+[a-z]+\.*)+(?:jpg|jpeg|png|pdf)$/.test(data.logoLink.trim()))      
    //   return res
    //     .status(400)
    //     .send({ status: false, msg: "Enter a valid amazon S3 logo URL" });

    //Validating isDeleted
    if (data.isDeleted) {
      if (typeof data.isDeleted !== "boolean")
        return res.status(400).send({
          status: false,
          msg: "Please enter true or false in Boolean only",
        });
    }
    next();
};

module.exports = { collegeValidation, validateData, validateBody, isValidKey };
