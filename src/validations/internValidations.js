const internModel = require("../models/internModel");

const { validateBody, validateData } = require("./collegeValidations");

const isValidKey = function (value) {
    if (!value) return false;
    return true;
};

const internValidations = async function (req, res, next) {
   try {let data = req.body;

    //Validating empty body
    if (!validateBody(data))
        return res.status(400).send({ status: false, msg: "Body cannot be empty" });

    //validating name is entered and valid
    if (!isValidKey(data.name))
        return res.status(400).send({ status: false, msg: "Please enter name" });

    if (!validateData(data.name))
        return res
            .status(400)
            .send({ status: false, msg: `${data.name} is not a valid name` });

    //validating email is unique and valid
    if (!isValidKey(data.email))
        return res.status(400).send({ status: false, msg: "Please enter email" });
    if (typeof data.email != "string")
        return res
            .status(400)
            .send({ status: false, msg: "Please enter email as a string" });
    if (!/^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(data.email.trim()))
        return res
            .status(400)
            .send({ status: false, msg: `${data.email} is not a valid email` });
    let duplicateEmail = await internModel.findOne({ email: data.email });
    if (duplicateEmail)
        return res
            .status(400)
            .send({ status: false, msg: `${data.email} is already registered` });

    //Validiating mobile number
    if (!isValidKey(data.mobile))
        return res
            .status(400)
            .send({ status: false, msg: "Please enter mobile number" });
    if (typeof data.mobile != "number")
        return res
            .status(400)
            .send({ status: false, msg: "Please enter mobile number as a number" });
    if (!/^[6789]\d{9}$/.test(data.mobile))
        return res
            .status(400)
            .send({
                status: false,
                msg: `${data.mobile} is not a valid mobile number`,
            });
    let duplicateMobile = await internModel.findOne({ mobile: data.mobile });
    if (duplicateMobile)
        return res
            .status(400)
            .send({ status: false, msg: `${data.mobile} is already registered` });

    //Validating isDeleted
    if (data.isDeleted) {
        if (typeof data.isDeleted !== "boolean")
            return res
                .status(400)
                .send({
                    status: false,
                    msg: "Please enter true or false in Boolean only",
                });
    }
    
    //Validating collegeName
    if (!isValidKey(data.collegeName))
        return res
            .status(400)
            .send({ status: false, msg: "Please enter College Name" });
    if (!validateData(data.collegeName))
        return res.status(400).send({status: false,msg: "Please enter valid College Name in String only"});
    if (!/^[a-z\s]*$/.test(data.collegeName))
        return res
          .status(400)
          .send({ status: false, msg: "collegeName should be in lower case"});

    next();}
    catch(error){
        res.status(500).send({ status: false, msg: error.message });
    }
};

module.exports = { internValidations };
