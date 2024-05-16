const connectionFirebase = require("../../config/connections/firebase.connection");
const BookRepository = require("../../repository/book.repository");

exports.GetBookController = async (req, res) => {
    try {
        const buku = new BookRepository(connectionFirebase)
        const data = await buku.findAll()
        const filtering = data.filter(x => x.stock !== 0)
        return res.status(200).send(filtering);
    } catch (error) {
        console.error(error)
        return res.status(500).send('Error adding document');
    }
}

exports.AddBookController = async (req, res) => {
    try {
        const { code, title, author } = req.body
        const buku = new BookRepository(connectionFirebase)
        const checkName = await buku.findByCondition([
            { field: 'title', operator: '=', value: title },
            { field: 'code', operator: '=', value: code },
            { field: 'author', operator: '=', value: author }
        ])
        if (checkName.length > 0) {
            return res.status(400).send({ message: 'Buku sudah ada !' });
        }
        await buku.add(req.body)
        return res.status(200).send({ message: 'Sukses menambahkan buku', ...req.body });
    } catch (error) {
        console.error(error)
        return res.status(500).send('Error adding document');
    }
}