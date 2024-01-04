const express = require("express")
const app=express()
require("dotenv").config()
require("./src/db/dbConnection")
const port=process.env.port || 5001

app.get("/",(req,res)=>{
    res.json({
        message:"Hoşgeldiniz"
    })
})

app.listen(port)