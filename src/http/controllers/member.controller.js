const connectionFirebase = require("../../config/connections/firebase.connection");
const MemberRepository = require("../../repository/member.repository");

exports.GetMembersController = async (req, res) => {
    try {
        const member = new MemberRepository(connectionFirebase)
        const data = await member.findAll()
        return res.status(200).send(data);
    } catch (error) {
        console.error(error)
        return res.status(500).send('Error adding document');
    }
}

exports.AddMemberController = async (req, res) => {
    try {
        const book = new BookRepository(connectionFirebase)
        const member = new MemberRepository(connectionFirebase)
        const bookLoan = new BookLoanRepository(connectionFirebase)
        const data = await member.findAll()
        return res.status(200).send(data);
    } catch (error) {
        console.error(error)
        return res.status(500).send('Error adding document');
    }
}
