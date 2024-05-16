const MemberRepository = require("../repository/member.repository")

exports.GenerateCodeMember = async (db) => {
    let code = 'M001'
    const member = new MemberRepository(db)
    const GetMember = await member.findAll()
    const LastMember = GetMember[GetMember.length]?.code || []
    const checkLength1 = LastMember.length > 0 && LastMember.slice(1).split('').filter(x => Number(x) !== 0).length
    const addNumber = Number(LastMember.join()) + 1

    if (checkLength1 === 2) {
        code = `M0${addNumber}`
    }
    if (checkLength1 === 3) {
        code = `M${addNumber}`
    }
    return code
}