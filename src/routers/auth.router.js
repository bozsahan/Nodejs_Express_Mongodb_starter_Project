const router=require("express").Router()
const {login,register,me,forgetPassword} =require("../controllers/auth.controller")
const authValidation=require("../middlewares/validations/auth.validation")
const{tokenCheck}=require("../middlewares/auth")
const upload = require("../middlewares/lib/upload")
const multer = require("multer")
const APIError = require("../utils/errors")
const Response = require("../utils/response")

router.post("/login",authValidation.login,login)

router.post("/register",authValidation.register,register)

router.get("/me",tokenCheck,me)

router.post("/forget-password",forgetPassword)


module.exports=router