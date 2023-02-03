const express = require('express')
const router = express.Router()
const token = require('../controllers/token')

const { User } = require('../models')
const jwt = require('jsonwebtoken');

router.use(express.urlencoded())




router.get('/',async (req,res)=>{

    const curr_token = req.cookies.access_token;
    console.log(curr_token);

    if (!curr_token) {
        return res.render('views/homepage.html',{home:{
            heading:"Hello! from home routes",
        }})
    }
    var decoded=jwt.decode(curr_token);
    console.log(decoded);
    curr_email= decoded.user_email
            
    const user= await User.findOne({
        where: { email: curr_email },
    });

      
    res.render('views/homepage.html',{home:{
        heading:"Hello! from home routes",
        user
    }})
});

module.exports = router;