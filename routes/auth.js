const express = require('express')
const { sequelize, User } = require('../models')
const router = express.Router()
let path = require('path');
const sendEmails = require('../controllers/sendEmails');
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');


router.use(express.urlencoded())

router.get('/register',async(req,res)=>{

    res.render('views/register.html');
})

router.post('/register',async(req,res)=>{
    console.log(req.body);
    const { name, email, password }  = req.body

    sendEmails(name,email)
    try{
        const user = await User.create({ name, email, password})

        res.redirect('/login');
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
    
})

router.get('/login',async(req,res)=>{
    res.render('views/login.html');
})

router.post('/login',async(req,res)=>{

    // log in for loan form 
    // validate user email and password
    
})

router.get('/verify/:token',(req,res)=>{
    const {token} = req.params;
    jwt.verify(token,process.env.JWT_TOKEN, function(err, decoded){
        if (err) {
            console.log(err);
            res.send("Email verification failed,possibly the link is invalid or expired");
        }
        else {
            res.send("Email verifified successfully");
        }
    })
})


module.exports = router;
