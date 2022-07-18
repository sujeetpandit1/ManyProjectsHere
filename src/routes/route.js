const express=require('express');
const router= express.Router();
const {urlShortner}=require('../controller/urlController')




router.get('/test', function (req, res){
    res.send('URL Shortner Project Started')})

router.post('/url/shorten', urlShortner)




module.exports=router;