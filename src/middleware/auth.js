const jwt = require('jsonwebtoken');
const { isValidObjectId } = require('mongoose');
const blogModel = require("../routes/models/blogModel");


let authentication = async function(req, res, next){
    try{
        let token = req.headers['x-api-key']
        if (!token)return res.status(400).send({ msg: "Token must be present" });

        next()
    }
    catch (error) {res.status(500).send({msg: error.message})}
};

let authorization = async function(req, res, next){
    try {
            let token = req.headers["x-api-key"];
            const decodedToken = jwt.verify(token, "blog/project");
            let currentPost = req.params.blogId;
            if(!isValidObjectId(currentPost))  return res.status(400).send({status : false, Message : "please put author_Id in path param"});
            let userLoggedIn = decodedToken.userId;
            //if (currentPost.length !== 24) return res.status(400).send({ status: false, msg: "Please provide valid blog Id" });

            const isCorrect = await blogModel.findById(currentPost).select({author_Id: 1,_id: 0,});
            const idOfBlogid = isCorrect.author_Id.toString();
        
            if (userLoggedIn == idOfBlogid) return res.status(403).send({ status: "false", msg: "user is not allowed to modify" });
              next();
           
                          
          } catch (error) {res.status(500).send(error.message)};
    };

 

module.exports={authentication,authorization}