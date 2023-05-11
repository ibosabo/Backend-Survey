const express = require('express');
const {login,register} = require('../controllers/auth.js');
const  {getAnket,deleteAnket,createAnket,updateAnket} = require('../controllers/anketpost.js')
const router = express.Router();

router.get('/getAnket', getAnket)
router.post('/createAnket', createAnket)
router.patch('/updateAnket/:id', updateAnket)
router.delete('/deleteAnket/:id',deleteAnket)


module.exports = router