const express = require('express')
const router = express.Router()
let path = require('path')
const { User } = require('../models')
const jwt = require('jsonwebtoken');
const {sendEmails} = require('../controllers/sendEmails');
router.use(express.urlencoded())



router.get('/postform',async (req,res)=>{   

    const curr_token = req.cookies.access_token;
    console.log("inside postform ", curr_token);

    if (!curr_token) {
        return res.render('homepage.html',{home:{
            heading:"Hello! from home routes",
        }})
    }
    var decoded=jwt.decode(curr_token);
    console.log(decoded);
    curr_email= decoded.user_email
            
    const user= await User.findOne({
        where: { email: curr_email },
    });
    console.log("user name is ", user.name);
    res.render('form.html',{
        form:{
            user
        }
    });
})


router.post('/postform',async (req,res)=>{

    const {name,email,company,designation,technology,location} = req.body;
    console.log("inside post form",email);
    const user= await User.findOne({
        where: { email: email },
    });

    user.set({
        companyName:company,
        designation:designation,
        technologyWorkingOn: technology,
        companyLocation:location
    })
    await user.save()
    const emailType = "response"
    sendEmails(user,emailType,user)
    res.send("Form completed, Responses has been sent on your email!")
});


module.exports = router;