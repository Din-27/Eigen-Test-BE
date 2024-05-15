const { BorrowingBookController } = require('../controllers/loan.controller')

const router = require('express').Router()

router.post('/', BorrowingBookController)

module.exports = router