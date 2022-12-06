const reviewModel = require('../models/reviewModel')
const productModel = require('../models/productModel')

const createReview = async (req, res) => {

    try {
        let fieldAllowed = ["userId", "description"];
        let data = req.body
        let keyOf = Object.keys(data)
        let receivedKey = fieldAllowed.filter((x) => !keyOf.includes(x));
        if (receivedKey.length) return res.status(400).send({status: false, message: `${receivedKey} is missing.`});

        let { userId, description } = data
        if (!userId.trim()) return res.status(400).send({status: false, message: 'userId cannot be blank'});
        if (userId.length != 24) return res.status(400).send({ tatus: false, message: `enter a valid userId` });

        if (!description.trim()) return res.status(400).send({status: false, message: 'description cannot be blank'});
        if(!(/^(?=.{1,1000})/.test(description.trim()))) return res.status(400).send({status:false, message: `description details required`});

        let findProduct= await productModel.findById({_id: userId})
        if(!findProduct) return res.status(400).send({ status: false, message: `product not found, create new one` });

        let findExistUserId= await reviewModel.findOne({userId})
        if(findExistUserId) return res.status(400).send({ status: false, message: `Review for this user Already Exist, Please update` });

        let createReview=await reviewModel.create(data)
        // let sendData= {userId:createReview.userId, description:createReview.description}
        delete createReview._doc._id
        return res.status(201).send({status:true, message:'review created successfully' , data:createReview})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const deleteReview = async function (req, res) {
    try {
        let id = req.params.userId
        if (id.length != 24) { return res.status(400).send({ status: false, message: "please enter proper length of userId (24)" }) };
        let checkReview = await reviewModel.findOne({ userId:id})
        if (!checkReview) return res.status(404).send({ status: false, message: "no such review exists " });
        
        let deleteReview = await reviewModel.deleteOne({userId:id}, { new: true });
        if (deleteReview.modifiedCount == 0) return res.status(400).send({status: false, message: "this review has been deleted already"});
        
        return res.status(200).send({ status: true, message: "This review is deleted successfully", data: deleteReview })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
};



module.exports = { createReview,deleteReview}
