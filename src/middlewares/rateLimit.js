const rateLimit= require("express-rate-limit")

const apiList=["::1"]

const apiLimiter=rateLimit({
    windowMs:15*60*1000,
    max:(req,res)=>{
        console.log("api url:",req.url)
        console.log("api ip:",req.ip)
        if(req.url==="/login"||req.url==="/register")return 5
        else return 10
    },
    message:{
        success:false,
        message:"Çok fazla istekte bulundunuz"
    },
    //skip:(req,res)=>allowList.includes(req.ip),
    standardHeaders: 'draft-7',
	legacyHeaders: false

})

module.exports=apiLimiter