const connectionFirebase = require("../../config/connections/firebase.connection")
const BookRepository = require("../../repository/book.repository")
const LoanRepository = require("../../repository/loan.repository")
const MemberRepository = require("../../repository/member.repository")
const PenaltyRepository = require("../../repository/penalty.repository")
const { v4: uuidv4 } = require('uuid');

exports.BorrowingBookController = async (req, res) => {
    const { codeMember, codeBook } = req.body
    try {
        const id = uuidv4()
        const today = new Date();
        const threeDaysAgo = new Date(today);
        threeDaysAgo.setDate(today.getDate() - 3);

        const book = new BookRepository(connectionFirebase)
        const member = new MemberRepository(connectionFirebase)
        const bookLoan = new LoanRepository(connectionFirebase)
        const penalty = new PenaltyRepository(connectionFirebase)


        const getMemberLoan = await member.findByCondition([{ field: 'code', operator: '=', value: codeMember }])
        if (checkMaxLoan.length > 2) {
            return res.status(400).send({ message: 'Pinjaman Buku sudah melebihi batas maksimal (2 buku )!' })
        }
        const checkStatusBook = await book.findByCondition([{ field: 'code', operator: '=', value: codeBook }])
        if (checkMaxLoan[0].stock === 0) {
            return res.status(400).send({ message: 'Buku Sudah Di pinjamkan ke member lain ! (stock 0)' })
        }

        const checkPenalty = await penalty.findByCondition([
            { field: 'code', operator: '=', value: codeMember },
            { field: 'createdAt', operator: '>', value: threeDaysAgo }
        ])
        if (checkPenalty.length > 0) {
            return res.status(400).send({ message: 'Anda tidak dapat meminjam buku, dikarenakan terkena penalty !' })
        }
        await bookLoan.add({ id, codeMember, codeBook, createdAt: new Date(Date.now()) })
        return res.status(200).send(data);
    } catch (error) {
        console.error(error)
        return res.status(500).send('Error adding document');
    }
}

exports.ReturnBookController = async (req, res) => {
    const { id } = req.body
    try {
        const today = new Date();
        const threeDaysAgo = new Date(today);
        threeDaysAgo.setDate(today.getDate() - 3);

        const book = new BookRepository(connectionFirebase)
        const member = new MemberRepository(connectionFirebase)
        const bookLoan = new LoanRepository(connectionFirebase)
        const penalty = new PenaltyRepository(connectionFirebase)


        const getMemberLoan = await member.findByCondition([{ field: 'code', operator: '=', value: codeMember }])
        if (checkMaxLoan.length > 2) {
            return res.status(400).send({ message: 'Pinjaman Buku sudah melebihi batas maksimal (2 buku )!' })
        }
        const checkStatusBook = await book.findByCondition([{ field: 'code', operator: '=', value: codeBook }])
        if (checkMaxLoan[0].stock === 0) {
            return res.status(400).send({ message: 'Buku Sudah Di pinjamkan ke member lain ! (stock 0)' })
        }

        const checkPenalty = await penalty.findByCondition([
            { field: 'code', operator: '=', value: codeMember },
            { field: 'createdAt', operator: '>', value: threeDaysAgo }
        ])
        if (checkPenalty.length > 0) {
            return res.status(400).send({ message: 'Anda tidak dapat meminjam buku, dikarenakan terkena penalty !' })
        }
        await bookLoan.delete(id)
        return res.status(200).send(data);
    } catch (error) {
        console.error(error)
        return res.status(500).send('Error adding document');
    }
}