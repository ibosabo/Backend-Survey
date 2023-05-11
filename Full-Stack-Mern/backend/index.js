//Halil İbrahim Sabo 

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); //env ve güvenlik için
const database = require('./configuration/database.js');
const authRouter = require('./router/auth.js'); 
const anketPostRouter = require('./router/anketpost.js'); 
dotenv.config();
const app = express();

app.use(cors())
app.use(bodyParser.json({limit:'50mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}))
app.use('/',authRouter) //frontend veri almak için dizine kaydırma yönlenince çalışsın
app.use('/',anketPostRouter) 
const PORT = 5000;
       
database(); 

 
app.listen(PORT, () => {
    console.log('listening on port ',PORT);
}) 