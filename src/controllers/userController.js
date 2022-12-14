const jwt = require('jsonwebtoken')
const userModel=require('../models/userModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { uploadFile } = require('../aws/aws');




const createUser = async function (req, res){
    res.setHeader('Access-Control-Allow-Origin' , '*')
    try {

        const fieldAllowed=["name", "password", "email", "phone"]
        const data=req.body

        const files=req.files
        if(files.length > 0){data.photo= await uploadFile(files[0])
        data.document= await uploadFile(files[0] || files[1])}
        // console.log(data.document);
        const keyOf=Object.keys(data)  
        const receivedKey=fieldAllowed.filter((x) => !keyOf.includes(x))
        if(receivedKey.length) return res.status(400).send({status: false, message: `${receivedKey} field key is missing`});

        const {name, password, email, phone} = data 
        if(!name.trim()) return res.status(400).send({status:false, message: "Name is Can'not be blank"});
        if(!(/^[A-Z a-z]{1,29}$/.test(name.trim()))) return res.status(400).send({status:false, message: "Name should be in alphabet only"});

        if(!password.trim()) return res.status(400).send({status:false, message: "Password is required"});
        if(!(/^\s*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,15}\s*$/.test(password.trim()))) return res.status(400).send({status:false, message: "Pasword Should be in Alphanumeric and special character and length 8-15 digit only"});

        const hash=bcrypt.hashSync(data.password, saltRounds);
        data.password=hash

        if(!email.trim()) return res.status(400).send({ status: false, message: `email cannot be blank` });
        if (!(/^\s*[a-zA-Z][a-zA-Z0-9]*([-\.\_\+][a-zA-Z0-9]+)*\@[a-zA-Z]+(\.[a-zAZ]{2,5})+\s*$/.test(email))) return res.status(400).send({status: false,message: `${email} should be a valid email address`});

        const checkMail= await userModel.findOne({email:email})
        if(checkMail) return res.status(400).send({status:false, message: `this ${email} is already registered, please enter new one or RESET Password`});

        if(!phone.trim()) return res.status(400).send({ status: false, message: `phone cannot be blank` });
        if (!/^[6789]\d{9}$/.test(phone)) return res.status(400).send({status: false,msg: `${phone} is not a valid mobile number, Please enter 10 digit phone number`});

        const checkPhone= await userModel.findOne({phone:phone})
        if(checkPhone) return res.status(400).send({status:false, message: `this ${phone} is already registered`});

        const savedUser= await userModel.create(data)
        return res.status(200).send({status:true, message:"Successfully registered", data:savedUser})
        
    } catch (error) {
        return res.status(500).send({status: false, message: error.message})
    } 
}
 
const userLogin = async function (req, res){
    try {
        const fieldAllowed=["password", "email"]
        const data=req.body
        const keyOf=Object.keys(data)
        const receivedKey=fieldAllowed.filter((x) => !keyOf.includes(x))
        if(receivedKey.length) return res.status(400).send({status: false, message: `${receivedKey} field key is missing`});

        const {email, password} = data
        if(!email.trim()) return res.status(400).send({ status: false, message: `email cannot be blank` });
        if(!password.trim()) return res.status(400).send({status:false, message: "Password is required"});

        const user= await userModel.findOne({email:email}) 
        if(!user) return res.status(400).send({status:false, message: " No user found with this credentials"})

        const match = await bcrypt.compare(password, user.password)     
        if(!match) return res.status(404).send({status:false, message: "Password is Incorrect"});


        //token

        const token =jwt.sign({
            userId:user._id
        }, "arjunpandit", {expiresIn:"12h"})
        //response.setHeader('x-api-key', token)

        return res.status(200).send({status:true, message: "Login Successfull", data:{userId:user._id, token:token}})
   

    } catch (error) {
        return res.status(500).send({status: false, message: error.message})
    }
}


module.exports={createUser,userLogin} 