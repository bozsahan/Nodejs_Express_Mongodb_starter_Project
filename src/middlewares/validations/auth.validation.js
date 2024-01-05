const joi = require("joi")
const APIError = require("../../utils/errors")

class authValidation {
    constructor() { }
    static register = async (req, res, next) => {
        try {
            await joi.object({
                name: joi.string().trim().min(3).max(30).required().messages({
                    "string.base": "İsim Alanı Normal Metin Olmalıdır",
                    "string.empty": "İsim Alanı Boş Olamaz.",
                    "string.min": "İsim Alanı En Az 3 Karakter Olmalıdır",
                    "string.max": "İsim Alanı En fazla 30 Karakter Olmalıdır",
                    "string.required": "İsim Alanı Boş geçilemez"
                }),
                lastname: joi.string().trim().min(3).max(30).required().messages({
                    "string.base": "Soyisim Alanı Normal Metin Olmalıdır",
                    "string.empty": "Soyisim Alanı Boş Olamaz.",
                    "string.min": "Soyisim Alanı En Az 3 Karakter Olmalıdır",
                    "string.max": "Soyisim Alanı En Fazla 30 Karakter Olmalıdır",
                    "string.required": "Soyisim Alanı Zorunludur"
                }),
                email: joi.email().trim().min(3).max(50).required().messages({
                    "string.base": "Email Alanı Normal Metin Olmalıdır",
                    "string.empty": "Email Alanı Boş Olamaz.",
                    "string.min": "Email Alanı En Az 3 Karakter Olmalıdır",
                    "string.max": "Email Alanı En Fazla 50 Karakter Olmalıdır",
                    "string.email": "Lütfen Geçerli Email Giriniz",
                    "string.required": "Email Alanı Zorunludur"
                }),
                password: joi.string().trim().min(3).max(30).required().messages({
                    "string.base": "Şifre Alanı Normal Metin Olmalıdır",
                    "string.empty": "Şifre Alanı Boş Olamaz.",
                    "string.min": "Şifre Alanı En Az 3 Karakter Olmalıdır",
                    "string.max": "Şifre Alanı En Fazla 30 Karakter Olmalıdır",
                    "string.required": "Şifre Alanı Zorunludur"
                })
            }).validateAsync(req.body)

        } catch (error) {
            if (error.details && error?.details[0].message)
                throw new APIError(error.details[0].message, 400)
            else throw new APIError("Lütfen Validasyon Kurallarına Uyunuz", 400)

        }
        next()
    }
}

module.exports = authValidation