const express= require('express');
const router= express.Router();
const {createBlog,getBlogs,getBlogById,updateBlog,deleteBlog}= require('./controller/blogController')
const { createReview, deleteReview} = require('./controller/reviewController');


router.post("/blogs", createBlog)
router.get("/blogs", getBlogs)
router.get("/blogs/:blogId",getBlogById)
router.put("/blogs/:blogId",updateBlog)
router.delete("/blogs/:blogId", deleteBlog)


router.post('/review',createReview)   
router.delete('/review/:userId',deleteReview)  

router.all('/**',function(req,res){
    res.status(404).send({status:false,message:'the api you request, Is not found'})
})

module.exports=router;