const mongoose = require('mongoose');

//mongoose modülünü başlatmak ve MongoDB veritabanına bağlanmak için bir database() fonksiyonu tanımlanır
const database = () => {

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=> {
    console.log("MongDB connected");
}).catch((err) => {
    console.log(err);
})
}
 

module.exports = database