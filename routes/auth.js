const express = require('express')
const { sequelize, User } = require('../models')
const router = express.Router()
let path = require('path');
const sendEmails = require('../controllers/sendEmails');
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const { Console } = require('console');
const token = require('../controllers/token');


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
    const {email,password}= req.body
    const currToken = token.createToken(email);
    return res.cookie("access_token",currToken,{
        httpOnly:true
    }).status(200).json({ message: "Logged in!"})
    
})

router.get('/verify/:token',async (req,res)=>{
    const {token} = req.params;
    console.log(token)
    jwt.verify(token,process.env.JWT_TOKEN, async function(err, decoded){

        if (err) {
            console.log(err);
            res.send("Email verification failed,possibly the link is invalid or expired");
        }
        else {
            var decoded=jwt.decode(token);
            console.log(decoded);
            res.send("Email verifified successfully");
            curr_email= decoded.user_email
            
            const user= await User.findOne({
                where: { email: curr_email },
            });

            user.set({
                isValidate:true,
                validatedOn: Date.now()
            })
            await user.save()

            console.log(curr_email);
            console.log(user.name);
            console.log(user.isValidate);
        }
    })
})


module.exports = router;
