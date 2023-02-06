const express = require('express')
const router = express.Router()
let path = require('path')
const { User, Emails } = require('../models')
const jwt = require('jsonwebtoken');
const token = require('../controllers/token');
const { getUserFromEmail } = require('../controllers/utils');
router.use(express.urlencoded())


// router.get('/emailslog/',async(req,res)=>{
    
// })


router.get('/emailslog',async(req,res)=>{

    const curr_token = req.cookies.access_token;
    console.log(curr_token);
    var decoded=jwt.decode(curr_token);
    console.log(decoded);
    curr_email= decoded.user_email
            
    const user= await User.findOne({
        where: { email: curr_email },
    });

    console.log(user.id);
    const UserId = user.id
    const emailType = "welcome"
    const emailStatus ="Sent"


    try{
        const email = await Emails.create({ userEmail: curr_email})
        // console.log(email);
        res.send(email)

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }

})


module.exports = router;
