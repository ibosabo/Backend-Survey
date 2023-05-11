

const AnketSchema = require('../models/anketpost.js');


const getAnket = async(req,res) => {
try {
    const getAnket = await AnketSchema.find();//  MongoDB veritabanindan butun anketleri getirir
       
    res.status(200).json(getAnket)// JSON formatinda butun anketleri yanit olarak gonderir


} catch (error) {
    res.status(500).json({ error: "Anket bulunamadı" }) //erroru gönder
}
}


const createAnket = async(req,res) => {
    try {
        const newPost = await AnketSchema.create(req.body); // HTTP istegi govdesindeki verileri kullanarak yeni bir anket olusturur
           
        res.status(200).json(newPost);
    
    
    }  catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message }); // Hata mesajını yanıt olarak gönder
  }
    }
    
    const updateAnket = async(req,res) => {
        try {
            const {id} = req.params;// HTTP istegi parametrelerinden anket kimligini alır
            const update = await AnketSchema.findByIdAndUpdate(id,req.body,{new:true}); // MongoDB veritabanindan anket belgesini bulur ve gunceller
               
            res.status(200).json(update)
        
        
        } catch (error) {
            res.status(500).json({ error: "Anket bulunamadı" }) 
        }
        }

        const deleteAnket = async(req,res) => {
            try {
                const {id} = req.params;
             await AnketSchema.findByIdAndRemove(id); // MongoDB veritabanindan anket belgesini bul ve sil
                   
                res.status(200).json({msg: "Silme İşlemi Başarılı"})
            
            } catch (error) {
                res.status(200).json({msg: error.message}) //erroru gönder
            }
            }

  module.exports = {getAnket,deleteAnket,updateAnket,createAnket}


            