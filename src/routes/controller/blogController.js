const blogModel=require('../models/blogModel')


const createBlog= async function (req, res){
    try {
        let fieldAllowed=["title", "body"];
        let data=req.body
        let keyOf=Object.keys(data)
        let receivedKey= fieldAllowed.filter((x) => !keyOf.includes(x));
        if(receivedKey.length) return res.status(400).send({status: false, message: `${receivedKey} is missing.`});
       
        let{title, body}= data

        if(!title.trim()) return res.status(400).send({status:false, message: 'title cannot be blank'});
        if (!(/^(?=.{1,50})/.test(title.trim()))) return res.status(400).send({ status: false, message: `title details required` });

        if(!body.trim()) return res.status(400).send({status:false, message: 'body cannot be blank'});
        if (!(/^(?=.{1,1000})/.test(body.trim()))) return res.status(400).send({ status: false, message: `body details required` });

        let checkTitle = await blogModel.findOne({title})
        if(checkTitle) return res.status(400).send({ status: false, message: `this title already exist` });

        let createdBlog=await blogModel.create(data)
        return res.status(201).send({status:true, message:'blog created successfully' , data:createdBlog})

    } catch (error) {res.status(500).send(error.message)};
};

const getBlogs = async function (req, res){
    try {
        const data = req.query
        const blog = await blogModel.find(data)
        if(!blog.length > 0) return res.status(404).send({status : false, message : "Blog Not Found"});
        return res.status(200).send({status : true, count:blog.length, message: blog})
       
    } catch (error) {res.status(500).send(error.message)}
};

const getBlogById = async (req, res) => {
    try {
        const blogId = req.params.blogId
        if (blogId.length != 24) return res.status(400).send({ status: false, message: "blogId not valid" })
        let blogData = await blogModel.findOne({ _id: blogId})
        if (!blogData) return res.status(404).send({ status: false, message: "blog not exist" })
        return res.status(200).send({ status: true, data: blogData })
    } catch (error) {
        return res.status(500).send({ satus: false, error: error.message })
    }
}

const updateBlog = async function (req, res){
    try {
        
        let blogId = req.params.blogId;
        if (blogId.length != 24) return res.status(400).send({ status: false, message: "blogId not valid" })
        
        let data = req.body;
        const { title, body} = data;

        let updatedblog = await blogModel.findOneAndUpdate({ _id: blogId }, {$set: {title: title, body: body}},{ new: true });
        if(updatedblog==null ||updatedblog==undefined) return res.status(404).send({ status: false, msg: "blog not found", });
        res.status(200).send({ status: true, message: "blog updated", data: updatedblog });

    } catch (error) {res.status(500).send(error.message)}
};

const deleteBlog = async function (req, res) {
    try {
        let id = req.params.blogId
        if (id.length != 24) { return res.status(400).send({ status: false, message: "please enter proper length of blog (24)" }) };
        let checkBlog = await blogModel.findOne({ _id: id })
        if (!checkBlog) return res.status(404).send({ status: false, message: "no such blog exists or has been deleted already" });

        let deleteBlog = await blogModel.deleteOne({ _id: id }, { new: true });
        return res.status(200).send({ status: true, message: "This blog is deleted successfully", data: deleteBlog, })
    } catch (err) {res.status(500).send(err.message)};
  };

module.exports={createBlog,getBlogs,getBlogById,updateBlog,deleteBlog}