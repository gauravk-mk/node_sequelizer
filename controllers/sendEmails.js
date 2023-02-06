const nodemailer = require("nodemailer");
const nunjucks = require("nunjucks");
const template_path = '/home/gaurav/nodework/seq_orm/datamodels/email_templates/index.html';
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config();

var val = Math.floor(1000 + Math.random() * 9000);  //yet to implement OTP logic

let JWT_SECRET = process.env.JWT_TOKEN

const sendEmails = async(curr_user) => {
    
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

    var template = nunjucks.render(template_path, { user:curr_user, otp:val, token:token });  

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
