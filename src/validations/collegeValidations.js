const collegeModel= require("../models/collegeModel")

const validateData= function(value){
    try{
    if(typeof value=== 'undefined'||typeof value === null)return false;
    if(!/^[a-zA-Z ._-]*$/.test(value))return false
    if(typeof value !== 'string'||value.trim().length==0)return false;    
    return true;
    }catch(error){
        res.status(500).send({status:false,msg:error.message})
    }
}
const validateBody= function(requestBody){
    if(!requestBody)return false; 
    if(Object.keys(requestBody).length ==0)return false;  
    return true;
}

const collegeValidation=async function(req,res,next){
    try{
    let data= req.body
    if(!validateBody(data))return res.status(400).send({status:false, msg: "Body cannot be empty"})

    if(!validateData(data.name))return res.status(400).send({status:false, msg: "Enter a valid name"})
    if(!/^[a-z]*$/.test(data.name))return res.status(400).send({status:false, msg: "name should be in lower case"})

    if(!validateData(data.fullName))return res.status(400).send({status:false, msg: "Enter a valid fullName"})

   if(!(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/).test(data.logoLink))return res.status(400).send({status:false, msg: "Enter a valid URL"}) //working till .com not taking path of image(regex)

   let duplicatename= await collegeModel.find({name:data.name})
   if(duplicatename.length !=0)return res.status(400).send({status:false, msg: `${data.name} name is already present`})

    next()


}catch(error){

    res.status(500).send({status:false,msg:error.message})
}
}

module.exports={collegeValidation}