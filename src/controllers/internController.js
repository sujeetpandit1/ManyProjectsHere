const internModel= require("../models/internModel")
const collegeModel=require('../models/collegeModel')



const createIntern= async function(req,res){
    try{

        let data=req.body;
        let college= await collegeModel.findOne({name:data.collegeName}).select({_id:1})
        data.collegeId=college.toString()
        // delete collegename remaining
        let savedData=await internModel.create(data)
        res.status(201).send({status:true, data: savedData})


    }catch(error){

        res.status(500).send({status:false,msg:error.message})
    }
}

module.exports={createIntern}