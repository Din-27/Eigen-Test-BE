const router = require('express').Router()
const { GetMembersController, AddMemberController, LoanBooksController } = require('../controllers/member.controller')

router.get('/', GetMembersController)
router.post('/', AddMemberController)

module.exports = router