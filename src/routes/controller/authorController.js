const jwt = require("jsonwebtoken");
const authorModel = require("../models/authorModel");

const createAuthors= async function (req, res){
    try {
        //key validation
        let fieldAllowed=["fname", "lname", "title", "email", "password"];
        let data=req.body
        let keyOf=Object.keys(data)
        let receivedKey= fieldAllowed.filter((x) => !keyOf.includes(x));
        if(receivedKey.length) return res.status(400).send({status: false, message: `${receivedKey} is missing.`});

        //key-value validation
        const {fname, lname, title, email, password}=data
        if(!fname.trim()) return res.status(400).send({status:false, message: 'fname cannot be blank'});
        if(!(/^[A-Za-z]{1,29}$/.test(fname.trim()))) return res.status(400).send({status:false, message: 'fname should be in alphabet only'});

        if(!lname.trim()) return res.status(400).send({status:false, message: 'lname cannot be blank'});
        if(!(/^[A-Za-z]{1,29}$/.test(lname.trim()))) return res.status(400).send({status:false, message: 'lname should be in alphabet only'});

        if(!title.trim()) return res.status(400).send({status:false, message: 'title cannot be blank'});
        if(!(title == "Mr" || title == "Miss" || title == "Mrs")) return res.status(400).send({status:false, message: 'title should be Mr, Mrs and Miss only'});

        if(!email.trim()) return res.status(400).send({status:false, message: 'email cannot be blank'});
        if(!(/^\s*[a-zA-Z][a-zA-Z0-9]*([-\.\_\+][a-zA-Z0-9]+)*\@[a-zA-Z]+(\.[a-zA-Z]{2,5})+\s*$/.test(email))) return res.status(400).send({status:false, message: 'email should be a valid'});

        let presentEmail= await authorModel.findOne({email:email})
        if(presentEmail) return res.status(400).send({status:false, message: `this ${email} is already present, please enter another one`});

        if(!password.trim()) return res.status(400).send({status:false, message: 'password cannot be blank'});
        if (!/^\s*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,15}\s*$/.test(password.trim()))return res.status(400).send({ status: false, msg: "Password Should Be in Alpha Numeric and Special  Character (length 8-15)" });

        let saveData= await authorModel.create(data)
        return res.status(201).send({status:true, message: saveData})
        
    } catch (error) {res.status(500).send(error.message)};
};

const loginAuthor = async function (req, res){
    try {
        let fieldAllowed=["email", "password"]
        let data= req.body
        let keyOf=Object.keys(data)
        let receivedKey= fieldAllowed.filter((x) => !keyOf.includes(x));
        if(receivedKey.length) return res.status(400).send({status: false, message: `${receivedKey} is missing.`});

        const {email, password}=data

        if(!email.trim()) return res.status(400).send({status:false, message: 'please enter emailId'});
        if(!password.trim()) return res.status(400).send({status:false, message: 'please enter password'});

        let user=await authorModel.findOne({email: email, password:password});
        if(!user) return res.status(400).send({status:false, message: `credentials not matched`});

        
        const token = jwt.sign({author_Id : user._id}, "blog/project", {expiresIn : "24h"})
        res.setHeader("x-api-key", token);
                        

        return res.status(200).send({status: true, message: 'author login successfully', data: {userId:user._id, token: token}})
        
    } catch (error) {res.status(500).send(error.message)};
};

module.exports={createAuthors,loginAuthor}