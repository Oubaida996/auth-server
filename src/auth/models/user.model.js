'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;


const usersModel = (db,DataTypes) =>{


    //=====Start const Users
   const Users =  db.define('users',

{
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    pwd: {
        type: DataTypes.STRING,
        allowNull: false
    },
token :{
    type :DataTypes.VIRTUAL
}


}
); 

//=====End const Users


//=====Start Users.authenticateBasic
Users.authenticateBasic = async function (username,password) {
    try {
        const user = await this.findOne({where:{userName:username}});
        const valid = await bcrypt.compare(password,user.pwd);
        // console.log("ssssssssssssssssssssssssaa",valid);
        if(valid) {
            // generate a new token
        let exp = Math.floor(Date.now()/1000)+600;// time 
            let newToken = jwt.sign({exp :exp,userName:user.userName},SECRET);
            user.token = newToken;
            return user;
        } else {
            console.log('user is not valid');
            // return;
            throw new Error('Invalid password');
        }
    } catch(error) {
       console.log('error ',error);
    }
};

//=====End Users.authenticateBasic


//=====Star Users.validateToken

Users.validateToken = async function(token) {
    const parsedToken = jwt.verify(token,SECRET);
    console.log('llllllll',parsedToken);
    const user = await this.findOne({where:{userName:parsedToken.userName}});
    if(user) {
        return user
    }
    throw new Error('invalid token'); //send the error to catch in bearer.auth file
};
//=====End Users.validateToken

return Users;

}




module.exports=usersModel;