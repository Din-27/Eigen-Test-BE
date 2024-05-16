class BookRepository {
    constructor(db) {
        this.db = db
        this.collectionName = 'book'
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
                documents.push({  ...doc.data() });
            });
            return documents;
        } catch (error) {
            console.error('Error getting documents', error);
            throw error;
        }
    }
    async findByCondition(conditions) {
        try {
            let collectionRef = this.db.collection(this.collectionName);
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
                documents.push({  ...doc.data() });
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
            const result = await collectionRef.doc(data.code).set(data);
            return result.id;
        } catch (error) {
            console.error('Error adding document', error);
            throw error;
        }
    }
    async update(docId, data) {
        try {
            await this.db.collection(this.collectionName).doc(docId).update(data);
            console.log(`Document with ID ${docId} updated successfully`);
            return { success: true };
        } catch (error) {
            console.error('Error updating document', error);
            throw error;
        }
    }
}

module.exports = BookRepository