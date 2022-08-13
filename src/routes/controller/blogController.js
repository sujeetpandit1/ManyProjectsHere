const { isValidObjectId } = require('mongoose');
const authorModel = require('../models/authorModel');
const blogModel=require('../models/blogModel')


const createBlog= async function (req, res){
    try {
        let fieldAllowed=["title", "body", "author_Id", "category"];
        let data=req.body
        let keyOf=Object.keys(data)
        let receivedKey= fieldAllowed.filter((x) => !keyOf.includes(x));
        if(receivedKey.length) return res.status(400).send({status: false, message: `${receivedKey} is missing.`});
       
        let{title, body, author_Id, tags, category, subcategory}= data

        if(!title.trim()) return res.status(400).send({status:false, message: 'title cannot be blank'});
        if (!(/^(?=.{1,50})/.test(title.trim()))) return res.status(400).send({ status: false, message: `title details required` });

        if(!body.trim()) return res.status(400).send({status:false, message: 'body cannot be blank'});
        if (!(/^(?=.{1,1000})/.test(body.trim()))) return res.status(400).send({ status: false, message: `body details required` });

        if(!author_Id.trim()) return res.status(400).send({status:false, message: 'author cannot be blank'});
        if (author_Id.length != 24) return res.status(400).send({ status: false, message: `enter a valid author_Id` });

        if(!tags) return res.status(400).send({status:false, message: 'category cannot be blank'});
        if (!(/^#?[a-zA-Z0-9 ]+/.test(tags))) return res.status(400).send({ status: false, message: `tags details can not be empty` });

        if(!category.trim()) return res.status(400).send({status:false, message: 'category cannot be blank'});
        if (!(/[A-Za-z][A-Za-z0-9_]{1,29}/.test(category.trim()))) res.status(400).send({ status: false, message: `category details can not be empty` });

        if (!(/^#?[a-zA-Z0-9 ]+/.test(subcategory))) res.status(400).send({ status: false, message: `subcategory  can not be empty` });

        let findAuthor= await authorModel.findById(author_Id)
        if(!findAuthor) return res.status(400).send({ status: false, message: `author not found` });

        let checkTitle= await blogModel.findOne({title, isDeleted:false})
        if(!checkTitle) return res.status(400).send({ status: false, message: `duplicate title` });

        let createdBlog=await blogModel.create(data)
        return res.status(201).send({status:true, message:'blog created successfully' , data:createdBlog})

    } catch (error) {res.status(500).send(error.message)};
};

const getBlogs = async function (req, res){
    try {
        // const getBlog=req.query
        // if (Object.keys(getBlog) == 0) return res.status(400).send({ status: false, msg: "No input provided" });
        
        // if (getBlog.category != undefined) {
        //     if (!getBlog.category) return res.status(400).send({ status: false, msg: 'please provide category' })};

        // if (getBlog.subcategory != undefined) {
        //     if (!getBlog.subcategory) return res.status(400).send({ status: false, msg: 'please provide subcategory' })};

        // if (getBlog.tags != undefined) {
        //     if (!getBlog.tags) return res.status(400).send({ status: false, msg: 'please provide tags' })};

        // if (getBlog.authorId != undefined) {
        //     if (!getBlog.authorId) return res.status(400).send({ status: false, msg: 'please provide authorId' })};

        // if (getBlog.isPublished != undefined) {
        //     if (!getBlog.isPublished) return res.status(400).send({ status: false, msg: 'please provide isPublished' })};

        // const blog = await blogModel.find({$and : [getBlog, { isDeleted: false }, { isPublished: true }]})
        // if (!blog.length > 0) return res.status(404).send({ msg: "No blog exist with given filters " });
        // return res.status(200).send({status : true, count:blog.length, message: blog});
//     } catch (error) {res.status(500).send(error.message)}
// };

//OR
        const getBlog = req.query
        if (Object.keys(getBlog) == 0) return res.status(400).send({ status: false, msg: "No input provided" });
        
        let filter={isDeleted: false, isPublished: true}

        if(req.query.author_Id) filter.author_Id=req.query.author_Id
        if (req.query.author_Id?.length == 0) return res.status(400).send({ status: false, msg: "please enter authorId to filter" });
        if (req.query.author_Id) {
            if (req.query.author_Id.length !== 24) return res.status(400).send({ status: false, msg: "Invalid author Id" })};

        if(req.query.category) filter.category=req.query.category
        if (req.query.category?.length == 0) return res.status(400).send({ status: false, msg: "please input category value details to filter" });

        if(req.query.tags) filter.tags=req.query.tags
        if (req.query.tags?.length == 0) return res.status(400).send({ status: false, msg: "please input tags value details to filter" });

        if(req.query.subcategory) filter.subcategory=req.query.subcategory
        if (req.query.subcategory?.length == 0) return res.status(400).send({ status: false, msg: "please input subcategory details to filter" });
       
        const blog = await blogModel.find(filter)
        if(!blog.length > 0) return res.status(404).send({status : false, message : "Blog Not Found"});
        return res.status(200).send({status : true, count:blog.length, message: blog})
       
    } catch (error) {res.status(500).send(error.message)}
};

const updateBlog = async function (req, res){
    try {
        
        let blogId = req.params.blogId;
        if (!blogId) return res.status(400).send({status : false, Message : "please put author_Id in path param"});
        if(!isValidObjectId(blogId))  return res.status(400).send({status : false, Message : "please put author_Id in path param"});
        
        let data = req.body;
        const { title, body, tags, subcategory, isPublished } = data;

        let updatedblog = await blogModel.find({isDeleted: false}).findOneAndUpdate({ _id: blogId },{$addToSet: { tags: tags, subcategory: subcategory },
        $set: {title: title, body: body, publishedAt: Date.now(), isPublished:isPublished}},{ new: true });
        if(updatedblog==null ||updatedblog==undefined) return res.status(404).send({ status: false, msg: "Post not found", });
        res.status(200).send({ status: true, msg: "blog updated", data: updatedblog });

    } catch (error) {
    console.log(error);
    res.status(500).send(error.message)}
};

const deleteBlog = async function (req, res) {
    try {
      let blogId = req.params.blogId;
      if (!blogId) return res.status(400).send({status : false, Message : "please put author_Id in path param"});
      if (blogId.length != 24) return res.status(400).send({status: false, message: "please enter proper length of author_Id (24)"});

      let data = await blogModel.find({ isDeleted: false }).findOneAndUpdate({ _id: blogId },{ $set: { isDeleted: true,deletedAt: Date.now()}},{ new: true })
      if (data == null || data == undefined) return res.status(404).send({ status: false, msg: "blog already deleted" });
      res.status(200).send({status: true, message: "blog delete successfully", data: data});
    } catch (err) {res.status(500).send(err.message)};
  };

  const deleteBlogByQuery = async function (req, res){
    try {
        const blogId=req.query
        if (Object.keys(blogId) == 0) return res.status(400).send({ status: false, msg: "No input provided" });
        
        if (blogId.category != undefined) {
            if (!blogId.category) return res.status(400).send({ status: false, msg: 'please provide category' })};

        if (blogId.subcategory != undefined) {
            if (!blogId.subcategory) return res.status(400).send({ status: false, msg: 'please provide subcategory' })};

        if (blogId.tags != undefined) {
            if (!blogId.tags) return res.status(400).send({ status: false, msg: 'please provide tags' })};

        if (blogId.authorId != undefined) {
            if (!blogId.authorId) return res.status(400).send({ status: false, msg: 'please provide authorId' })};

        if (blogId.isPublished != undefined) {
            if (!blogId.isPublished) return res.status(400).send({ status: false, msg: 'please provide isPublished' })};

        const blog = await blogModel.find(blogId)
        if (!blog.length > 0) return res.status(404).send({ msg: "No blog exist with given filters " });

      
        let data = await blogModel.find({ isDeleted: false }).findOneAndUpdate({blogId},{ $set: { isDeleted: true,deletedAt: Date.now()}},{ new: true });
        if (data == null || data == undefined) return res.status(404).send({ status: false, msg: "blog already deleted" });
        res.status(200).send({status: true, message: "blog deleted successfully", data: data});
       
    } catch (error) {res.status(500).send(error.message)}
};
module.exports={createBlog,getBlogs,updateBlog,deleteBlog,deleteBlogByQuery}