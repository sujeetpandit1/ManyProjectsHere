const multer=require("multer")



    const fileFilter =  (req, res, next) => {
    const files = req.files
// console.log(files);
    if(files?.length > 0){if(files[0]){if (files[0].mimetype != "image/png" && files[0].mimetype != "image/jpg" && files[0].mimetype !=
    "image/jpeg") return res.status(400).send({ status: false, message: "Only .png, .jpg and .jpeg format allowed!" });
    
    }
    if(files[0] || files[1]){if (files[0] || files[1].mimetype != "application/pdf" && files[0] || files[1].mimetype != "application/vnd.ms-excel") 
        return res.status(400).send({ status: false, message: "Only PDF, Excel and CSV allowed!" });
    }}

    next();

}
 


module.exports=fileFilter