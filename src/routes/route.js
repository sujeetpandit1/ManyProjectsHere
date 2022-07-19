const express= require('express');
const router= express.Router();
const {urlShortner,getUrl}=require('../controller/urlController')
const {client}=require('../redis/redis')



router.post('/url/shorten', urlShortner)
router.get('/:urlCode', getUrl)


router.all('/**',function(req,res){
    res.status(404).send({status:false,message:'the api you request, Is not found'})
})

module.exports=router;