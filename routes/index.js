const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');



router.get('/' , async(req, res)=>{
    res.render('index');
})


module.exports = router;