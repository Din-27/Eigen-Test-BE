const router = require('express').Router()
const { GetMembersController, AddMemberController, LoanBooksController } = require('../controllers/member.controller')

/**
   * @openapi
   * '/api/v1/member':
   *  get:
   *     tags:
   *     - Members
   *     summary: get members
   *     responses:
   *      200:
   *        description: Success
   *      400:
   *        description: Bad request
   *      500:
   *        description: Server error
   */
router.get('/', GetMembersController)

/**
   * @openapi
   * '/api/v1/member':
   *  post:
   *     tags:
   *     - Members
   *     summary: add members
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           example:
   *            name: Herdiyana
   *     responses:
   *      200:
   *        description: Success
   *      400:
   *        description: Bad request
   *      500:
   *        description: Server error
   */
router.post('/', AddMemberController)

module.exports = router