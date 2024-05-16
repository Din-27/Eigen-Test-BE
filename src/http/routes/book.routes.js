const router = require('express').Router()
const { GetBookController, AddBookController } = require('../controllers/book.controller')

/**
   * @openapi
   * '/api/v1/book':
   *  get:
   *     tags:
   *     - Books
   *     summary: get books
   *     responses:
   *      200:
   *        description: Success
   *      400:
   *        description: Bad request
   *      500:
   *        description: Server error
   */
router.get('/', GetBookController)
/**
   * @openapi
   * '/api/v1/book':
   *  post:
   *     tags:
   *     - Books
   *     summary: add book
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           example:
   *            code: JK-45
   *            title: Harry Potter
   *            author: J.K Rowling
   *            stock: 1
   *     responses:
   *      200:
   *        description: Success
   *      400:
   *        description: Bad request
   *      500:
   *        description: Server error
   */
router.post('/', AddBookController)

module.exports = router