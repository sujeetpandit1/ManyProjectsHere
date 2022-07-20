const urlModel = require('../model/urlModel')
const shortid = require('shortid');


const urlShortner = async function (req, res) {
    try {
        let data = req.body
        let { longUrl, ...rest } = data
        //check longUrl is present or not
        if(!longUrl) return res.status(400).send({statuis:false,message:"longUrl key must be present"})
        //check if any unwanted key is present or not in body
        if(Object.keys(rest).length>0) return res.status(400).send({statuis:false,message:"please provide valid keys"})
        //check longUrl is valid or not
        if (!/^(https:\/\/www\.|http:\/\/www\.|www\.)[a-zA-Z0-9\!-_$]+\.[a-zA-Z]{2,5}(\/)+[A-Za-z0-9\!@#$%&*?=+_.-]+/.test(longUrl.trim()))
        return res.status(400).send({ status: false, msg: "Enter a valid URL link" });
        //create urlcode and shorturl
        let code = shortid.generate()
        let details = {}
        details.urlCode = code
        details.longUrl = longUrl
        details.shortUrl = `http://localhost:3000/${code}`
        const createNewUrl = await urlModel.create(details)
        let selectUrl = await urlModel.findOne(details).select({ urlCode: 1, longUrl: 1, shortUrl: 1, _id: 0 })
        res.status(201).send({ status: true, data: selectUrl })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })

    }
}

// const getUrl=async function(req,res){
//     try{
//         let urlCode=req.params.urlCode
//         //find urlCode in Db
//         let findUrlCode= await urlModel.findOne({urlCode:urlCode})
//         if(!findUrlCode) return res.status(404).send({status:false, message:"this urlcode is not found in DB"})
//         res.status(302).redirect(findUrlCode.longUrl)
        
//     }catch(error){
//         res.status(500).send({status:false, message: error.message})
//     }
    
// }

const getUrl = async function(req, res) {
    try {
        const urlCode = req.params.urlCode
    
        let cachedData = await GET_ASYNC(`${urlCode}`)
        if(cachedData) {
    
             let changed = JSON.parse(cachedData)
            return res.status(302).redirect(changed.longUrl)
            
        }
        const isUrlExist = await urlModel.findOne({ urlCode: urlCode});
    
        if (isUrlExist) {
            
            if (urlCode !== isUrlExist.urlCode) {
            return res.status(404).send({ status: false, Message: "No Url Found, Please Check Url Code", });
            }
            await SET_ASYNC(`${urlCode}`, JSON.stringify(isUrlExist))
            return res.status(302).redirect(isUrlExist.longUrl);
        }
        return res.status(404).send({ status: false, message: 'This Url is not present in Db' })
        
    
    } catch (error) {
        res.status(500).send({ status: false, Message: error.message });
    }
    };
module.exports={ urlShortner,getUrl }
