const express = require('express')
const router = express.Router()
const bookvalidation = require('../validator/bookvalidation')
const { checkCreate, checkLogin } = require('../validator/uservalidation')
const { createBook, getBookbyQuerry, updateBook } = require('../controllers/bookController')
const { createUser, userLogin } = require('../controllers/userController')
const { authentication, authorization } = require('../middlewares/auth');


// router.post('/register',uservalidation,usercontroller)
// router.post('/register',checkCreate,createUser)
router.post('/login', checkLogin, userLogin)
router.post('/books', authentication, authorization, bookvalidation, createBook)
// router.get('/books',getBookbyQuerry)
// router.get('/books/:bookId',)
router.put('/books/:bookId', updateBook)
// router.delete('/books/:bookId',)
// router.post('/books/:bookId/review',)

// router.all("/**", function (req, res) {
//     res.status(404).send({
//         status: false,
//         msg: "The api you request is not available"
//     })
// })

module.exports = router;
