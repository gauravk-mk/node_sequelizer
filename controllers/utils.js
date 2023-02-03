const { sequelize, User } = require('../models')



async function getUserFromEmail(curr_email){

    const user= await User.findOne({
        where: { email: curr_email },
    });
    
    return user;

}


module.exports={"getUserFromEmail":getUserFromEmail}