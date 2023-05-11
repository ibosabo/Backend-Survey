const AuthSchema = require('../models/auth.js')
const jwt = require('jsonwebtoken')
const md5 = require('md5')

const register = async (req, res) => {

    try {
        const { username, password, email } = req.body
        const user = await AuthSchema.findOne({ email })
        // Kullanıcının zaten var olup olmadığını kontrol edilir
        if (user) {
            return res.status(400).json({ message: "Bu Kullanıcı Kayıtlı" })
        }
        if (password.length < 6) {
            return res.status(500).json({ message: "Şifre 6 Karakterden küçük olmamalı" })
        }
        // md5 kullanarak hash şifresini oluşturur
        const passwordHash = md5(password)
        if (!isEmail(email)) {
            return res.status(400).json({ message: "Hatalı Email Formatı Girdiniz." });
        }
        // Yeni kullanıcı oluşturur
        const newUser = await AuthSchema.create({ username, email, password: passwordHash })

        const token = jwt.sign({ id: newUser._id }, "SECRET_KEY", { expiresIn: '1h' }) // Yeni bir JWT token oluşturulur
        res.status(201).json({
            status: "OK",
            newUser,
            token
        }) // 201 status kodu ve yeni kullanıcı ve token bilgileri döndürülür
    }
    catch (error) {
     
        return res.status(500).json({ message: error.message })
    }
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body
        const user = await AuthSchema.findOne({ email }) // Kullanıcının veritabanında var olup olmadığını kontrol eder
        if (!user) {
            return res.status(200).json({ message: "Bu Kullanıcı Kayıtlı Değil" })
        }
        // Parola karmalarını karşılaştırır
        const passwordCompare = md5(password) === user.password
        if (!passwordCompare) {
            return res.status(200).json({ message: "Girilen Şifre Yanlıştır." })
        }

        // Yeni Token oluşturur
        const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: '1h' })

        res.status(200).json({
            status: "OK",
            user,
            token
        })  

    }
    catch (error) {
        
    }
}

// E-postanın geçerli olup olmadığını kontrol eder
function isEmail(emailAdress) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regex))
        return true;
    else return false
}

module.exports = { login, register }
