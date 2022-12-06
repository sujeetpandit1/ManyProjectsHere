const express= require('express')
const router = express.Router();
const {createProduct,getProduct,getProductById,updateProduct,deleteProduct}= require('./controllers/productController');
const { createReview, deleteReview} = require('./controllers/reveiwController');

//product api

router.post('/product',createProduct)
router.get('/product',getProduct)
router.get('/product/:productId',getProductById)
router.put('/product/:productId',updateProduct)
router.delete('/product/:productId',deleteProduct)


//review api
router.post('/review',createReview)   
router.delete('/review/:userId',deleteReview)  
// router.get('/review/:userId',findReview)  




module.exports=router;