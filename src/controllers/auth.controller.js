const user = require("../models/user.model")
const bcrypt = require("bcrypt")
const APIError = require("../utils/errors")
const Response = require("../utils/response")
const { createToken } = require("../middlewares/auth")
const crypto=require("crypto")
const sendEmail = require("../utils/sendMail")
const moment = require("moment")


const login = async (req, res) => {
    console.log("login")
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

const me=async(req,res)=>{
    return new Response(req.user).success(res)
}

const forgetPassword=async(req,res)=>{
    const {email}=req.body

    const userInfo =await user.findOne({email}).select("name lastname email")

    if(!userInfo) return new APIError("Geçersiz kullanıcı ",400)

    console.log("userInfo : ",userInfo);

    const resetCode=crypto.randomBytes(3).toString("hex")

    await sendEmail({
        from:"baseapi7@gmail.com",
        to:userInfo.email,
        subject:"Şifre sıfırlama",
        text:`Şifre sıfırlama kodunuz : ${resetCode}`

    })

    await user.updateOne(
        {email},
        {
            reset:{
                code:resetCode,
                time:moment(new Date()).add(15,"minute").format("YYYY-MM-DD HH:mm:ss")
                
            }
        }
    )

    return new Response(true,"Lütfen mail kutunuzu kontrol ediniz").success(res)

}

module.exports = {
    login,
    register,
    me,
    forgetPassword
}