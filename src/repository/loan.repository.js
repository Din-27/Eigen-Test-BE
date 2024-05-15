class LoanRepository {
    constructor(db) {
        this.db = db
        this.collectionName = 'book_loan'
    }
    async findAll() {
        try {
            const collectionRef = this.db.collection(this.collectionName);
            const snapshot = await collectionRef.get();
            if (snapshot.empty) {
                console.log('No matching documents.');
                return [];
            }

            const documents = [];
            snapshot.forEach(doc => {
                documents.push({ id: doc.id, ...doc.data() });
            });
            return documents;
        } catch (error) {
            console.error('Error getting documents', error);
            throw error;
        }
    }
    async findByCondition(conditions) {
        try {
            let collectionRef = db.collection(collectionName);
            conditions.forEach(condition => {
                collectionRef = collectionRef.where(condition.field, condition.operator, condition.value);
            });

            const snapshot = await collectionRef.get();
            if (snapshot.empty) {
                console.log('No matching documents.');
                return [];
            }

            const documents = [];
            snapshot.forEach(doc => {
                documents.push({ id: doc.id, ...doc.data() });
            });
            return documents;
        } catch (error) {
            console.error('Error getting documents', error);
            throw error;
        }
    }
    async add(data) {
        try {
            const collectionRef = this.db.collection(this.collectionName);
            const result = await collectionRef.add(data);
            return result.id;
        } catch (error) {
            console.error('Error adding document', error);
            throw error;
        }
    }
    async delete(docId) {
        try {
            await db.collection(collectionName).doc(docId).delete();
            console.log(`Document with ID ${docId} deleted successfully`);
            return docId;
          } catch (error) {
            console.error('Error deleting document', error);
            throw error;
          }
    }
}

module.exports = LoanRepository