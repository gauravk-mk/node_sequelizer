const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

let JWT_SECRET = process.env.JWT_TOKEN



function createToken(user_email){
    const token = jwt.sign(
        {user_email},JWT_SECRET,{ expiresIn: '1d'},
    ); 
    return token;      
}

function getEmailFromToken(token){
    const payload=jwt.decode(token)
    return payload.email
}


module.exports = {"createToken":createToken, "getEmailFromToken":getEmailFromToken}
