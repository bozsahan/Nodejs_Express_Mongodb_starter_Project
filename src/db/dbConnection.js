const mongoose=require("mongoose")

mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("Veritabanı bağlantısı yapıldı.")
    })
    .catch((err)=>{
        console.log("Veritabanı bağlantısı yapılamadı: ",err)
    })