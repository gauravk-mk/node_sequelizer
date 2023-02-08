const express = require('express')
const router = express.Router()
let path = require('path')
const { User, Emails } = require('../models')
const jwt = require('jsonwebtoken');
const token = require('../controllers/token');
const template_path = '/home/gaurav/nodework/seq_orm/template/email_templates/index.html';
router.use(express.urlencoded())

router.get('/getemail/:id',async(req,res)=>{

    try{
        
        const id = req.params.id;
        const emailLog = await Emails.findOne({
            where:{ id: id},
        });
        currEmail = emailLog.userEmail
        console.log(currEmail);
        const curr_user = await User.findOne({
            where:{ email:currEmail},
        })

        console.log(curr_user.email)
        // var template = nunjucks.render(template_path, { user:curr_user});  

        res.render(template_path,{user: curr_user, type: emailLog.emailType })

    }catch(err){
        res.send(err)
    }
    
})


module.exports = router;
