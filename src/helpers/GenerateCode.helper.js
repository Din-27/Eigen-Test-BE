const MemberRepository = require("../repository/member.repository")

exports.GenerateCodeMember = async (db) => {
    let code = 'M001'
    const member = new MemberRepository(db)
    const GetMember = await member.findAll()
    const LastMember = GetMember[GetMember.length - 1]?.code || ''
    const checkLength = LastMember.length > 0 && LastMember.match(/[1-9]/gm)
    const addNumber = Number(checkLength) + 1

    switch (checkLength.length) {
        case 1:
            code = `M00${addNumber}`
            break;
        case 2:
            code = `M0${addNumber}`
            break;
        case 3:
            code = `M${addNumber}`
            break;
    }

    return code
}