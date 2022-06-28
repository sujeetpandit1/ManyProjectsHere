const express = require('express')
const router= express.Router()
const collegeController= require('../controllers/collegeController')
const internController=require('../controllers/internController')
const {collegeValidation}= require('../validations/collegeValidations')

router.post('/functionup/colleges', collegeValidation, collegeController.createCollege )

router.post('/functionup/interns',internController.createIntern )

router.get("/test",function(req,res){
    res.send("Project-2 has started !!!")
})




module.exports=router