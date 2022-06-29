const collegeModel= require("../models/collegeModel")
const internModel= require("../models/internModel")

const validateData= function(value){
    
    if(typeof value=== 'undefined'||typeof value === null)return false;
    if(typeof value !== 'string'||value.trim().length==0)return false;    
    return true;
   
}

const validateObjectId=function(ObjectId){
    return mongoose.Types.ObjectId.validate(ObjectId)
}

const validateBody= function(requestBody){
    return Object.keys(requestBody).length>0
}


module.exports={internValidation}