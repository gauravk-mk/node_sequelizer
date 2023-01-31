const nodemailer = require("nodemailer");
const nunjucks = require("nunjucks");
const template_path = '/home/gaurav/nodework/seq_orm/datamodels/email_templates/index.html';

let username = "Gaurav";
var val = Math.floor(1000 + Math.random() * 9000);  //yet to implement OTP logic


const sendEmails = async(req, res) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "gkathar221@gmail.com",
            pass: "gmyxntgjpkexkutd"
        }
    });
    var template = nunjucks.render(template_path, { name:username });  
    let info = await transporter.sendMail({
        from: "gkathar221@gmail.com",
        to: "gaurav@mortgagekart.com",
        subject: "Sample from nodemon",
        text: "text from the info",
        html: template
    });
    res.json(info)
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
