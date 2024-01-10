const nodemailer=require("nodemailer")
require("dotenv").config()


const sendEmail=async (mailOptions)=>{
    const transporter=nodemailer.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASSWORD
        }
    })
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log("Mail gönderilemedi: ",error)
        }
        console.log("info:",info)
        return true

    })

}

module.exports=sendEmail