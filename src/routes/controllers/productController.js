const productModel = require('../models/productModel')


const createProduct = async (req, res) => {

    try {
        // key validation

        let fieldAllowed = ["name", "price"]
        const data = req.body
        let keyOf = Object.keys(data)
        let receivedKey = fieldAllowed.filter((x) => !keyOf.includes(x))
        if (receivedKey.length) return res.status(400).send({ status: false, message: `${receivedKey} is missing` })

        const { name, price } = data
        if (!name.trim()) {
            return res.status(400).send({ status: false, message: "name is required" })
        }
     
        const checkName = await productModel.findOne({ name, isDeleted: false })
        if (checkName) {
            return res.status(400).send({ status: false, message: "name already in use" })
        }

        const product = await productModel.create(data)

        return res.status(201).send({ status: true, message: " Successful", data: product })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const getProduct = async (req, res) => {
    try {
        const data = req.query
        let filter = { isDeleted: false }

        const product = await productModel.find(filter)
        if (!product.length > 0) return res.status(404).send({ status: false, message: "Blog Not Found" });
        return res.status(200).send({ status: true, count: product.length, message: product })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}

const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId
        if (productId.length != 24) return res.status(400).send({ status: false, message: "productId not valid" })
        let productData = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!productData) return res.status(404).send({ status: false, message: "product not exist" })
        return res.status(200).send({ status: true, data: productData })
    } catch (error) {
        return res.status(500).send({ satus: false, error: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId
        if (productId.length != 24) return res.status(400).send({ status: false, message: "productId not valid" })

        let data = req.body
        const { name, price } = data
        if (!name.trim()) {
            return res.status(400).send({ status: false, message: "name is required" })
        }

        let updatedData = await productModel.findOneAndUpdate({ _id: productId, isDeleted: false }, { $set: { name: name, price: price } }, { new: true })
        if (!updatedData) {
            return res.status(404).send({ status: false, message: 'Product with this data not found' })
        }
        return res.status(200).send({ status: true, message: "success", data: updatedData });
    } catch (error) {
        return res.status(500).send({ satus: false, error: error.message })
    }
}

const deleteProduct = async function (req, res) {
    try {
        let id = req.params.productId
        if (id.length != 24) { return res.status(400).send({ status: false, message: "please enter proper length of productId (24)" }) };
        let checkProduct = await productModel.findOne({ _id: id })
        if (!checkProduct) return res.status(404).send({ status: false, message: "no such product exists " });
        let deleteProduct = await productModel.deleteOne({ _id: id }, { new: true });
        if (deleteProduct.modifiedCount == 0) return res.status(400).send({status: false,message: "this product has been deleted already"});
        return res.status(200).send({ status: true, message: "This product is deleted successfully", data: deleteProduct, })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
};

module.exports = { createProduct, getProduct, getProductById, updateProduct, deleteProduct }