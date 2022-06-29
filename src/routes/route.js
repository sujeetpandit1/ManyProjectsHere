const express = require('express')
const router= express.Router()
const collegeController= require('../controllers/collegeController')
const internController=require('../controllers/internController')
const {collegeValidation}= require('../validations/collegeValidations')
const {internValidations}= require('../validations/internValidations')

router.post('/functionup/colleges', collegeValidation, collegeController.createCollege )

router.post('/functionup/interns',internValidations,internController.createIntern )

router.get('/functionup/collegeDetails',collegeController.getCollege)

// router.get("/test",function(req,res){
//     res.send("Project-2 has started !!!")
// })




module.exports=router