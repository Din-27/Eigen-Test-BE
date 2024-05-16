const Repository = require("./parent")

class MemberRepository extends Repository {
    constructor(db) {
        super()
        this.db = db
        this.collectionName = 'member'
    }
}

module.exports = MemberRepository