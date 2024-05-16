const Repository = require("./parent")

class BookRepository extends Repository {
    constructor(db) {
        super()
        this.db = db
        this.collectionName = 'book'
    }
}

module.exports = BookRepository