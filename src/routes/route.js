const express = require('express')
const router= express.Router()
const {createCollege,getCollege}= require('../controllers/collegeController')
const {createIntern}=require('../controllers/internController')
const {collegeValidation}= require('../validations/collegeValidations')
const {internValidations}= require('../validations/internValidations')
const{filesUpload}=require('../aws/aws')


// college API
router.post('/functionup/colleges',filesUpload,collegeValidation,createCollege)

//intern API
router.post('/functionup/interns',internValidations,createIntern)

// college Details Get API
router.get('/functionup/collegeDetails',getCollege)

module.exports=router