const express=require('express');
const router= express.Router();
const {urlShortner}=require('../controller/urlController')




router.get('/test', function (req, res){
    res.send('URL Shortner Project Started')})

router.post('/url/shorten', urlShortner)


router.all('/**',function(req,res){
    res.status(404).send({status:false,message:'the api you request, Is not found'})
})

module.exports=router;