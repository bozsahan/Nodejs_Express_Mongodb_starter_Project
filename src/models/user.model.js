const { date } = require("joi")
const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    reset:{
        code:{
            type:String,
            default:null
        },
        time:{
            type:Date,
            default:null
        }
    }

},{collection:"users"})

const user=mongoose.model("users",userSchema)

module.exports=user