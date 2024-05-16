const Repository = require("./parent")

class LoanRepository extends Repository {
    constructor(db) {
        super()
        this.db = db
        this.collectionName = 'book_loan'
    }
}

module.exports = LoanRepository