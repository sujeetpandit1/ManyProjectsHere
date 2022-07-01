const express = require('express')
const router= express.Router()
const {createCollege,getCollege}= require('../controllers/collegeController')
const {createIntern}=require('../controllers/internController')
const {collegeValidation}= require('../validations/collegeValidations')
const {internValidations}= require('../validations/internValidations')


// college API
router.post('/functionup/colleges', collegeValidation,createCollege)

//intern API
router.post('/functionup/interns',internValidations,createIntern)

// college Details Get API
router.get('/functionup/collegeDetails',getCollege)

module.exports=router