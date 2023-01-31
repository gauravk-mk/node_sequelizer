const express = require('express')
const { sequelize, User } = require('../models')
const router = express.Router()
let path = require('path');
const sendEmails = require('../controllers/sendEmails');

router.use(express.urlencoded())


router.get('/register',async(req,res)=>{

    res.render('views/register.html');

    // try{
    //     const register= await User.findAll()

    //     return res.json(register)
    // }catch(err){
    //     console.log(err)
    //     return res.status(500).json({ error:'Something went wrong'})
    // }
})

router.post('/register',async(req,res)=>{
    console.log(req.body);
    const { name, email, password }  = req.body
    sendEmails(name,email)
    try{
        const user = await User.create({ name, email, password})
        return res.json(user)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

module.exports = router;
