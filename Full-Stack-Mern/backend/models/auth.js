const mongoose = require('mongoose');


//veritabanında username,email,password doldurulma zorunluluğu vardır.Şema yapısı gösterilmiştir.
const AuthSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true,
        trim:true
        
    }, 
    email: {
        type: String,
        required: true,
        unique:true
        
    },
    password: {
        type: String,
        required: true,
       
    },
})

module.exports = mongoose.model('auth', AuthSchema) //veritabanında saklanır