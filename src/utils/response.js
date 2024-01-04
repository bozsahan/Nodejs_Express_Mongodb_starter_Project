class Response{
    constructor(data=null,message=null){
        this.data=data
        this.message=message
        }
    success(res){
        return res.status(200).json({
            succes:true,
            data:this.data,
            message:this.message ?? "İşlem başarılı"
        })
    }
    created(res){
        return res.status(201).json({
            success:true,
            data:this.data,
            message:this.message ?? "işlem başarılı"
        })
    }
    error500(res){
        return res.status(500).json({
            success:false,
            data:this.data,
            message:this.message ?? "işlem başarısız"
        })
    }
    error400(res){
        return res.status(400).json({
            success:false,
            data:this.data,
            message:this.message ?? "işlem başarısız"
        })
    }
    error401(res){
        return res.status(401).json({
            success:false,
            data:this.data,
            message:this.message ?? "Lütfen oturum açın"
        })
    }
    error404(res){
        return res.status(404).json({
            success:false,
            data:this.data,
            message:this.message ?? "işlem başarısız"
        })
    }
    error429(res){
        return res.status(429).json({
            success:false,
            data:this.data,
            message:this.message ?? "Çok fazla istek atıldı"
        })
    }
}

module.exports = Response