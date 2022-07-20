const urlModel = require('../model/urlModel')
const shortid = require('shortid');
const redis = require("redis");

const { promisify } = require("util");

//Connect to redis
const redisClient = redis.createClient(
    13800,
    "redis-13800.c264.ap-south-1-1.ec2.cloud.redislabs.com",
    { no_ready_check: true }
);
redisClient.auth("Vtbolgcq4b2IlvwksBW5lYBVnei8JVeP", function (err) {
    if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});



//1. connect to the server
//2. use the commands :

//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);


const urlShortner = async function (req, res) {
    try {
        let data = req.body
        let { longUrl, ...rest } = data
        //check longUrl is present or not
        if(!longUrl) return res.status(400).send({statuis:false,message:"longUrl key must be present"})
        //check if any unwanted key is present or not in body
        if(Object.keys(rest).length>0) return res.status(400).send({statuis:false,message:"please provide valid keys"})
        //check longUrl is valid or not
        if (!/^(https:\/\/www\.|https:\/\/app\.|http:\/\/www\.|www\.)[a-zA-Z0-9\!-_$]+\.[a-zA-Z]{2,5}(\/)+[A-Za-z0-9\!@#$%&*?=+_.-]+/.test(longUrl.trim()))
        return res.status(400).send({ status: false, msg: "Enter a valid URL link" });
        //create urlcode and shorturl
        let getData = await GET_ASYNC(`${longUrl}`)
        let result = JSON.parse(getData)
        if(result){
            const data = {
                "urlCode": result.urlCode,
                "longUrl": result.longUrl,
                "shortUrl": result.shortUrl
            }
            return res.status(200).send({ status: true, data: data })
        }else{
            const foundUrl = await urlModel.findOne({ longUrl })
            if (foundUrl) {
                const data = {
                    "urlCode": foundUrl.urlCode,
                    "longUrl": foundUrl.longUrl,
                    "shortUrl": foundUrl.shortUrl
                }
                await SET_ASYNC(`${longUrl}`, JSON.stringify(foundUrl))
                return res.status(200).send({ status: true, data: data })
            }
        }
        let code = shortid.generate()
        let details = {}
        details.urlCode = code
        details.longUrl = longUrl
        details.shortUrl = `http://localhost:3000/${code}`
        const createNewUrl = await urlModel.create(details)
        let selectUrl = {
            "urlCode" : createNewUrl.urlCode,
            "longUrl" : createNewUrl.longUrl,
            "shortUrl" : createNewUrl.shortUrl
        }
        res.status(201).send({ status: true, data: selectUrl })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })

    }
}

const getUrl=async function(req,res){
    try{
        let urlCode=req.params.urlCode
        let cashUrl = await GET_ASYNC(`${urlCode}`)
        let data=JSON.parse(cashUrl)
        if(cashUrl) { res.status(302).redirect(data.longUrl)}
        else{
        let findUrlCode= await urlModel.findOne({urlCode:urlCode}).select({ urlCode: 0, _id: 0 });
        await SET_ASYNC(`${urlCode}`, JSON.stringify(findUrlCode))
        if(!findUrlCode) return res.status(404).send({status:false, message:"this urlcode is not found in DB"})
        res.status(302).redirect(findUrlCode.longUrl)}
        
    }catch(error){
        res.status(500).send({status:false, message: error.message})
    }
    
}
module.exports={ urlShortner,getUrl }

