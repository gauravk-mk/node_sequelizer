const nodemailer = require("nodemailer");
const nunjucks = require("nunjucks");
const template_path = '/home/gaurav/nodework/seq_orm/datamodels/email_templates/index.html';
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config();
// let username = "Gaurav";
var val = Math.floor(1000 + Math.random() * 9000);  //yet to implement OTP logic

let JWT_SECRET = process.env.JWT_TOKEN



const sendEmails = async(user_name,user_email) => {
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "gkathar221@gmail.com",
            pass: "gmyxntgjpkexkutd"
        }
    });
    console.log("*****")
    console.log(user_email)
    console.log(user_name)

    const token = jwt.sign(
        {user_email},JWT_SECRET,{ expiresIn: '1d'},
    );    

    var template = nunjucks.render(template_path, { name:user_name, otp:val, token:token });  

    console.log("****************")
    console.log(user_email)
    let info = await transporter.sendMail({
        from: "gkathar221@gmail.com",
        to: user_email,
        subject: "Sample from nodemon",
        text: "text from the info",
        html: template
    });
    console.log("****************")
    console.log(user_email)

    // res.json(info)
    console.log("This is info",info);
    console.log("This is info html response ",info.response);
    transporter.sendMail(info, (err) => {
        if(err){
            console.log("An error occured...",err);
        }
        else{
            console.log("Email sent successfully.");
        }
    })

};



module.exports = sendEmails;
