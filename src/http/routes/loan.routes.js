const { BorrowingBookController, ReturnBookController, GetLoanDatasController } = require('../controllers/loan.controller')

const router = require('express').Router()

/**
   * @openapi
   * '/api/v1/loan':
   *  get:
   *     tags:
   *     - Book Loan
   *     summary: Get data Pinjam Buku
   *     responses:
   *      200:
   *        description: Success
   *      400:
   *        description: Bad request
   *      500:
   *        description: Server error
   */
router.get('/', GetLoanDatasController)
/**
   * @openapi
   * '/api/v1/loan/pinjam':
   *  post:
   *     tags:
   *     - Book Loan
   *     summary: Endpoint Pinjam Buku
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           example:
   *            codeMember: M001
   *            codeBook: JK-45
   *     responses:
   *      200:
   *        description: Success
   *      400:
   *        description: Bad request
   *      500:
   *        description: Server error
   */
router.post('/pinjam', BorrowingBookController)
/**
   * @openapi
   * '/api/v1/loan/kembalikan':
   *  post:
   *     tags:
   *     - Book Loan
   *     summary: Endpoint Serah Buku
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           example:
   *            id: 680e8fe6-6277-43c8-9c8b-b84b07483839
   *     responses:
   *      200:
   *        description: Success
   *      400:
   *        description: Bad request
   *      500:
   *        description: Server error
   */
router.post('/kembalikan', ReturnBookController)

module.exports = router