const aws=require('aws-sdk')


aws.config.update({
    accessKeyId:"AKIAXESS2UIQHNUNLPNA",
    secretAccessKey:"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",
    region:"ap-south-1"
  })

let uploadFile= async ( file) =>{
return new Promise( function(resolve, reject) {
// this function will upload file to aws and return the link
let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws

var uploadParams={
    Bucket:"book-management-book-covers",
    Key:"profile-img/"+Date.now()+file.originalname,
    Body:file.buffer
}

s3.upload( uploadParams, function (err, data ){
if(err) {
return reject({"error": err})
}
//console.log(data)
//console.log("file uploaded succesfully")
return resolve(data.Location)
})
// let data= await s3.upload( uploadParams)
// if( data) return data.Location
// else return "there is an error"
})
}
// const filesUpload = async function(req, res, next){
// try{
// let files= req.files
// if(files && files.length>0){
// //upload to s3 and get the uploaded link
// // res.send the link back to frontend/postman
// let uploadedFileURL= await uploadFile( files[0] )
// //res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
// req.link=uploadedFileURL

// }
// else{res.status(400).send({ msg: "No file found" })}
// }catch(err){ res.status(500).send({msg: err})}
// }
module.exports = {uploadFile};