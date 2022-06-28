const express = require('express')
const router= express.Router()
const {createCollege}= require('../controllers/collegeController')
const {createIntern}=require('../controllers/internController')
const {collegeValidation}= require('../validations/collegeValidations')

router.post('/functionup/colleges', collegeValidation,createCollege )

router.post('/functionup/interns',createIntern)

router.get("/test",function(req,res){
    res.send("Project-2 has started !!!")
})




module.exports=router