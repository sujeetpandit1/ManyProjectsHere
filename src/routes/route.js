const express = require('express')
const router= express.Router()
const {createCollege,getCollege}= require('../controllers/collegeController')
const {createIntern}=require('../controllers/internController')
const {collegeValidation}= require('../validations/collegeValidations')
const {internValidations}= require('../validations/internValidations')

router.post('/functionup/colleges', collegeValidation,createCollege )

router.post('/functionup/interns',internValidations,createIntern )

router.get('/functionup/collegeDetails',getCollege)

// router.get("/test",function(req,res){
//     res.send("Project-2 has started !!!")
// })




module.exports=router