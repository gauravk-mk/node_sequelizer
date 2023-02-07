const nodemailer = require("nodemailer");
const nunjucks = require("nunjucks");
const template_path = '/home/gaurav/nodework/seq_orm/datamodels/email_templates/index.html';
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const { Emails } = require('../models')


dotenv.config();

var val = Math.floor(1000 + Math.random() * 9000);  //yet to implement OTP logic

let JWT_SECRET = process.env.JWT_TOKEN

const sendEmails = async(curr_user, emailType, emailjson) => {
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "gkathar221@gmail.com",
            pass: "gmyxntgjpkexkutd"
        }
    });
    console.log("*****")
    console.log(curr_user.email)
    console.log(curr_user.name)
    console.log(curr_user.companyName)

    user_email=curr_user.email
    user_name=curr_user.name
    const token = jwt.sign(
        {user_email},JWT_SECRET,{ expiresIn: '1d'},
    );    

    var template = nunjucks.render(template_path, { user:curr_user,token:token });  

    console.log("****************")
    console.log(user_email)
    let info = await transporter.sendMail({
        from: "gkathar221@gmail.com",
        to: user_email,
        subject: "Sample from nodemon",
        text: "text from the info",
        html: template
    });

    // res.json(info)
    // console.log("This is info",info);
    // console.log("This is info html response ",info.response);
    const sendmail = transporter.sendMail(info, async (err) => {
        var emailStatus="sentout"
        if(err){
            console.log("An error occured...",err);
            emailStatus="failed"
            console.log(emailStatus);
        }
        else{
            console.log("Email sent successfully.");
            emailStatus = "sent"
            console.log("in else",emailStatus);
        }
        
        try{
            console.log("updating log", emailStatus);
            const email = await Emails.create({ 
                userEmail: user_email, 
                emailType: emailType, 
                emailStatus: emailStatus,
                emailTemplateJSON:emailjson
            })

            await email.set({
                emailLink: `http://localhost:5000/getemail/${email.id}`
            })
            await email.save()
            // console.log(email);
        }catch(err){
            console.log(err);
        }
        // return emailStatus;
    })
};

module.exports = {"sendEmails":sendEmails};
