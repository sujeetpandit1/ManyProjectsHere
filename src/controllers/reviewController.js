const reviewModel = require("../models/reviewModel")

const bookModel = require("../models/booksModel")


const createReview = async function (req, res) {
    try {
        let bookID = req.params.bookId

        req.body.bookId = bookID

        let requestBody = req.body
            //<----------------------checking book is present or not---------------------->//
        let bookCheck = await bookModel.findById({ _id:bookID, isDeleted: false })

        if (!bookCheck)
            return res.status(404).send({ status: false, message: "book not found" })
            //<--------------------------increasing book review count------------------->//
        let bookDetails = await bookModel.findByIdAndUpdate({ _id:bookID }, { $inc: { reviews: 1 } })
            //<----------------------------create review--------------------------->//
        let createReview = await reviewModel.create(requestBody)

        res.status(201).send({ status: true, message: "Sucess", data: createReview })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}

















module.exports = { createReview }