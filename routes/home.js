const express = require('express')
const router = express.Router()
let path = require('path')

router.get('/',(req,res)=>{
    res.render('views/homepage.html',{home:{
        heading:"Hello! from home routes",
    }})
});

module.exports = router;