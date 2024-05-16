const Repository = require("./parent")

class PenaltyRepository extends Repository {
    constructor(db) {
        super()
        this.db = db
        this.collectionName = 'penalti'
    }
}

module.exports = PenaltyRepository