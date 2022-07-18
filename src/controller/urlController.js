const urlModel =require('../model/urlModel')
const validUrl = require('valid-url');
const shortid = require('shortid');



const urlShortner= async function(req, res){
    try {
        let data= req.body
        let {urlCode, longUrl, shortUrl,...rest}=data
        const createNewUrl =await urlModel.create(data);
        res.status(201).send({status:true, data:createNewUrl})
    } catch (error) {res.status(500).send({status:false, message: error.message})
        
    }
}

const getUrl=async function(req,res){
    try{
        let urlCode=req.params.urlCode
        let findUrlCode= await urlModel.findOne(urlCode)
        if(!findUrlCode) return res.status(404).send({status:false, message:"this urlcoe is not found in DB"})
        if(urlCode != findUrlCode.urlCode) return res.status(404).send({status:false, message:"params urlcode and findUrlCode not matched"})
        return res.status(200).send({status:true,data:findUrlCode.longUrl});
    }catch(error){
        res.status(500).send({status:false, message: error.message})
    }
    
}
module.exports={urlShortner}
module.exports={getUrl}


