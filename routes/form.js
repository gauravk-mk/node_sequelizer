const express = require('express')
const router = express.Router()
let path = require('path')

router.post('/postform',(req,res)=>{
    res.send("Form completed, Responses has been sent on your email!")
});

router.get('/postform',(req,res)=>{
    res.render('views/form.html');
})

module.exports = router;