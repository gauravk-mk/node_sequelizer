const express = require('express')
const { sequelize, User } = require('../models')
const router = express.Router()
let path = require('path');
const {sendEmails} = require('../controllers/sendEmails');
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const { Console } = require('console');
const token = require('../controllers/token');


router.use(express.urlencoded())

router.get('/register',async(req,res)=>{

    res.render('register.html');
})

router.post('/register',async(req,res)=>{
    console.log(req.body);
    const { name, email, password }  = req.body

    try{
        const user = await User.create({ name, email, password})    
        const emailType = "welcome"
        sendEmails(user,emailType)
        res.redirect('/login');
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
    
})

router.get('/login',async(req,res)=>{
    res.render('login.html');
})

router.post('/login',async(req,res)=>{
    const password= req.body.password
    const remail=req.body.email
    console.log(remail);

    const user= await User.findOne({
        where: { email: remail, password:password },
    });

    console.log(req.body);
    if(user){
        console.log("inside user");
        console.log(remail);
        const currToken = await token.createToken(remail);
        console.log(currToken);
        console.log("this is ----");
        res.cookie("access_token",currToken,{
            httpOnly:true
        })
        return res.redirect('/');
    }else{
        res.send("not registered or wrong password!")
    }
    
    
})

const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, process.env.JWT_TOKEN);
      req.email = data.email;
      return next();
    } catch {
      return res.sendStatus(403);
    }
  };

router.get("/logout", authorization, (req, res) => {
    
    console.log("in logout");

    res
      .clearCookie("access_token")
      .status(200)
      .redirect('/');
      
    //   .json({ message: "Successfully logged out" });
  });


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
