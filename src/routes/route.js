const express= require('express')
const router=express.Router()
const {createCustomer,getListofActiveCustomers,updateCustDetails,deleteCustomer} = require('../customerControllers/customerColntoller');
const {createCard, getListOfCards}= require('../customerControllers/cardController')


/**  --------- Customer's API's ---------- **/
router.post('/customerRegistration', createCustomer)
router.get('/getAll',getListofActiveCustomers)
router.put('/:custId',updateCustDetails)
router.delete('/:custId',deleteCustomer)


/**  --------- Card's API's ---------- **/
router.post('/cardRegistration', createCard)
router.get('/getAllCards', getListOfCards)

router.get('/testing', function (req, res) {
    res.status(200).send({status: true, message: " Hello Testing API is Live"})})
router.all('/**', function (req, res) {
    res.status(404).send({status: false, message: " Requested API not Available"})})

module.exports=router; 