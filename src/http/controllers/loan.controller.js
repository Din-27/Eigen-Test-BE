const connectionFirebase = require("../../config/connections/firebase.connection")
const BookRepository = require("../../repository/book.repository")
const LoanRepository = require("../../repository/loan.repository")
const MemberRepository = require("../../repository/member.repository")
const PenaltyRepository = require("../../repository/penalty.repository")
const { v4: uuidv4 } = require('uuid');
const moment = require('moment')
const now = moment()


exports.GetLoanDatasController = async (req, res) => {
    try {
        const bookLoan = new LoanRepository(connectionFirebase)
        const getDataLoan = (await bookLoan.findAll()).map(x => {
            return {
                id: x.id,
                codeBook: x.codeBook,
                codeMember: x.codeMember
            }
        })

        return res.status(200).send(getDataLoan);
    } catch (error) {
        console.error(error)
        return res.status(500).send('Error adding document');
    }
}

exports.BorrowingBookController = async (req, res) => {
    const { codeMember, codeBook } = req.body
    try {
        const id = uuidv4()
        // const now = moment('2024-05-20T14:56:36+07:00')
        const book = new BookRepository(connectionFirebase)
        const bookLoan = new LoanRepository(connectionFirebase)
        const penalty = new PenaltyRepository(connectionFirebase)

        const getStock = await book
            .findByCondition([{ field: 'code', operator: '=', value: codeBook }])

        const getMemberLoan = await bookLoan
            .findByCondition([{ field: 'codeMember', operator: '=', value: codeMember }])

        const checkStatusBook = await book
            .findByCondition([{ field: 'code', operator: '=', value: codeBook }])

        if (checkStatusBook.length === 0) {
            return res
                .status(400)
                .send({ message: 'Buku yang anda pinjam tidak ditemukan!' })
        }
        if (getMemberLoan.length >= 2) {
            return res
                .status(400)
                .send({ message: 'Pinjaman Buku sudah melebihi batas maksimal (2 buku )!' })
        }
        if (checkStatusBook[0]?.stock === 0) {
            return res
                .status(400)
                .send({ message: 'Buku Sudah Di pinjamkan ke member lain ! (stock 0)' })
        }

        const checkPenalty = await penalty
            .findByCondition([
                { field: 'codeMember', operator: '=', value: codeMember }
            ])
        for (const item of checkPenalty) {
            const borrowDate = moment(item.createdAt)
            // console.log(borrowDate, now.diff(borrowDate, 'days'));
            if (now.diff(borrowDate, 'days') <= 3) {
                return res
                    .status(400)
                    .send({ message: 'Anda tidak dapat meminjam buku, dikarenakan terkena penalty !' })
            }
        }
        await book
            .update(codeBook, { stock: Number(getStock[0].stock) - 1 })
        await bookLoan
            .add({ id, codeMember, codeBook, createdAt: moment() })
        return res.status(200).send({ message: 'Buku Berhasil di pinjam', id: id });
    } catch (error) {
        console.error(error)
        return res.status(500).send('Error adding document');
    }
}

exports.ReturnBookController = async (req, res) => {
    const { id } = req.body
    try {
        // const now = moment('May 24, 2024');

        const book = new BookRepository(connectionFirebase)
        const member = new MemberRepository(connectionFirebase)
        const bookLoan = new LoanRepository(connectionFirebase)
        const penalty = new PenaltyRepository(connectionFirebase)


        const checkBookLoan = await bookLoan
            .findByCondition([{ field: 'id', operator: '=', value: id }])
        if (checkBookLoan.length === 0) {
            return res
                .status(400)
                .send({ message: 'ID Buku yang anda masukan salah !' })
        }
        const codeMember = checkBookLoan[0].codeMember
        const codeBook = checkBookLoan[0].codeBook

        const getNameMember = await member
            .findByCondition([{ field: 'code', operator: '=', value: codeMember }])
        const getBookName = await book
            .findByCondition([{ field: 'code', operator: '=', value: codeBook }])

        if (checkBookLoan.length === 0) {
            return res
                .status(400)
                .send({ message: 'Buku yang di pinjam bukan buku milik member !' })
        }
        const borrowDate = moment(checkBookLoan[0].createdAt)
        if (now.diff(borrowDate, 'days') > 7) {
            await penalty
                .add({ codeMember, codeBook: checkBookLoan[0].codeBook, createdAt: moment() })
        }

        const getStock = await book
            .findByCondition([{ field: 'code', operator: '=', value: codeBook }])
        await book.update(codeBook, { stock: Number(getStock[0].stock) + 1 })
        await bookLoan.delete(id)
        return res
            .status(200)
            .send({ message: `Buku peminjam ${getNameMember[0].name} dengan judul ${getBookName[0].title} Berhasil Di kembalikan` });
    } catch (error) {
        console.error(error)
        return res.status(500).send('Error adding document');
    }
}