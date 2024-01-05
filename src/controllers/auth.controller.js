const user = require("../models/user.model")
const bcrypt = require("bcrypt")
const APIError = require("../utils/errors")
const Response = require("../utils/response")
const { createToken } = require("../middlewares/auth")



const login = async (req, res) => {
    const { email, password } = req.body

    const userInfo = await user.findOne({ email })
    const comparePassword = await bcrypt.compare(password, userInfo.password)
    console.log(userInfo)
    console.log(comparePassword)
    if (!userInfo || !comparePassword)
        throw new APIError("Email veya şifre hatalı")
    createToken(userInfo,res)
}

const register = async (req, res) => {
    const { email } = req.body
    const userCheck = await user.findOne({ email })

    if (userCheck) {
        throw new APIError("Girmiş olduğunuz Email kullanımda.", 401)

    }
    req.body.password = await bcrypt.hash(req.body.password, 10)

    const userSave = new user(req.body)

    await userSave.save()
        .then((data) => {
            return new Response(data, "Kayıt başarıyla eklendi").created(res)

        })
        .catch((err) => {
            throw new APIError("Kullanıcı Kayıt Edilemedi,400")
            console.log(err)
        })


    console.log(req.body)
}

module.exports = {
    login,
    register
}