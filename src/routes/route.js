const express= require('express');
const router= express.Router();
const {createAuthors,loginAuthor}=require('./controller/authorController')
const {createBlog,getBlogs,updateBlog,deleteBlog,deleteBlogByQuery}= require('./controller/blogController')
const {authentication,authorization}= require('../middleware/auth')


router.post("/authors",createAuthors)
router.post("/login", loginAuthor)

router.post("/blogs", authentication,createBlog)
router.get("/blogs", authentication,getBlogs)
router.put("/blogs/:blogId", authentication,authorization,updateBlog)
router.delete("/blogs/:blogId", authentication,authorization,deleteBlog)
router.delete("/blogs",authentication,deleteBlogByQuery)

router.all('/**',function(req,res){
    res.status(404).send({status:false,message:'the api you request, Is not found'})
})

module.exports=router;