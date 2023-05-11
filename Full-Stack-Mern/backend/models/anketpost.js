const mongoose = require('mongoose');
//Veritabanında cevabın zorunlu olmadığı ve yapısı(şeması) belirtilmiştir.
const AnketSchema = new mongoose.Schema({
    soru: {
      type: String,
      required: true,
      trim: true
    },
    cevap: {
      type: String,
      required: false,
      trim: true
    }
  });

module.exports = mongoose.model('anket', AnketSchema) 