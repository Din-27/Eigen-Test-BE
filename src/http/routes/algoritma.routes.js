const { ReverseAlphabet, LongestSentence, FamousShowing, MatrixNxN } = require('../controllers/algoritma.controller')

const router = require('express').Router()

/**
   * @openapi
   * '/api/v1/algoritma/reverse':
   *  post:
   *     tags:
   *     - Algoritma
   *     summary: Endpoint Algoritma Reverse Alfabet
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           example:
   *            chars: EIGEN1
   *     responses:
   *      200:
   *        description: Success
   *      400:
   *        description: Bad request
   *      500:
   *        description: Server error
   */
router.post('/reverse', ReverseAlphabet)

/**
   * @openapi
   * '/api/v1/algoritma/longest':
   *  post:
   *     tags:
   *     - Algoritma
   *     summary: Endpoint Algoritma Longest Sentence
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           example:
   *            chars: Saya sangat senang mengerjakan soal algoritma
   *     responses:
   *      200:
   *        description: Success
   *      400:
   *        description: Bad request
   *      500:
   *        description: Server error
   */
router.post('/longest', LongestSentence)

/**
   * @openapi
   * '/api/v1/algoritma/famous':
   *  post:
   *     tags:
   *     - Algoritma
   *     summary: Endpoint Algoritma Famous Showing Letter
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           example:
   *            input: ['xc', 'dz', 'bbb', 'dz']
   *            query: ['bbb', 'ac', 'dz']
   *     responses:
   *      200:
   *        description: Success
   *      400:
   *        description: Bad request
   *      500:
   *        description: Server error
   */
router.post('/famous', FamousShowing)

/**
   * @openapi
   * '/api/v1/algoritma/longest':
   *  post:
   *     tags:
   *     - Algoritma
   *     summary: Endpoint Matrix NxN
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           example:
   *            matrix: [[1, 2, 0], [4, 5, 6], [7, 8, 9]]
   *     responses:
   *      200:
   *        description: Success
   *      400:
   *        description: Bad request
   *      500:
   *        description: Server error
   */
router.post('/matrix', MatrixNxN)

module.exports = router