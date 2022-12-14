const express= require('express')
const router=express.Router()
const {createUser,userLogin} = require('../controllers/userController')
const fileFilter = require('../multer/multer')



router.post('/userRegistration', fileFilter,createUser)
router.post('/login', userLogin)


router.get('/testing', function (req, res) {
    res.status(404).send({status: false, message: " Hello API is Live"})})
router.all('/**', function (req, res) {
    res.status(404).send({status: false, message: " Requested API not Available"})})

module.exports=router; 