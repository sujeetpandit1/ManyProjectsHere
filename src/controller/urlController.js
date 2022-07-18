const urlModel =require('../model/urlModel')
const validUrl = require('valid-url');
const shortid = require('shortid');



const urlShortner= async function(req, res){
    try {
        let data= req.body
        let {urlCode, longUrl, shortUrl,...rest}=data
        const createNewUrl =await urlModel.create(data);
        res.status(400).send({status:true, data:createNewUrl})
    } catch (error) {res.status(500).send({status:false, message: error.message})
        
    }
}


module.exports={urlShortner}


