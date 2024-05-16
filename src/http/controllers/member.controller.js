const connectionFirebase = require("../../config/connections/firebase.connection");
const { GenerateCodeMember } = require("../../helpers/GenerateCode.helper");
const LoanRepository = require("../../repository/loan.repository");
const MemberRepository = require("../../repository/member.repository");
const { MemberSchema } = require("../schema/member.schema")


exports.GetMembersController = async (req, res) => {
    try {
        const result = []
        const member = new MemberRepository(connectionFirebase)
        const bookLoan = new LoanRepository(connectionFirebase)

        const data = await member.findAll()
        for (const item of data) {
            const detailBorrow = await bookLoan
                .findByCondition([{ field: 'codeMember', operator: '=', value: item.code }])
            if (detailBorrow.length > 0) {
                item.detail = detailBorrow.map(x => {
                    return {
                        id: x.id,
                        codeBook: x.codeBook,
                        codeMember: x.codeMember
                    }
                })
            }
            result.push(...result, item)
        }
        return res.status(200).send(result);
    } catch (error) {
        console.error(error)
        return res.status(500).send('Error adding document');
    }
}

exports.AddMemberController = async (req, res) => {
    try {
        const { name } = req.body
        const { error } = MemberSchema.validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.message })
        }
        const member = new MemberRepository(connectionFirebase)
        const checkName = await member.findByCondition([{ field: 'name', operator: '=', value: name }])
        if (checkName.length > 0) {
            return res.status(400).send({ message: 'Nama sudah ada !' });
        }
        const code = await GenerateCodeMember(connectionFirebase)
        const data = { code, name }
        await member.add(data)
        return res.status(200).send({ message: 'Sukses menambahkan member', ...req.body });
    } catch (error) {
        console.error(error)
        return res.status(500).send('Error adding document');
    }
}
