const MemberRepository = require("../repository/member.repository")

exports.GenerateCodeMember = async (db) => {
    let code = 'M001'
    const member = new MemberRepository(db)
    const GetMember = await member.findAll()
    const LastMember = GetMember[GetMember.length - 1]?.code || ''
    const checkLength = LastMember.length > 0 && LastMember.match(/[1-9]/gm)
    console.log(checkLength);
    const addNumber = Number(checkLength) + 1
    if (checkLength.length === 1) {
        code = `M00${addNumber}`
    }
    if (checkLength.length === 2) {
        code = `M0${addNumber}`
    }
    if (checkLength.length === 3) {
        code = `M${addNumber}`
    }
    return code
}