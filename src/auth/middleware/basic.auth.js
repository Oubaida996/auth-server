'use strict';
const base64 = require('base-64');
const {Users} =require("../models/database");

module.exports =async (req,res,next)=>{
    // console.log('kkkk');
    if(req.headers['authorization']) {
        let basicHeaderParts= req.headers.authorization.split(' ');
        // console.log('basicHeaderParts >>> ',basicHeaderParts);
        let encodedPart = basicHeaderParts.pop(); //encoded(username:password)
        // console.log('encodedPart >>> ',encodedPart);
        let decoded = base64.decode(encodedPart); //username:password
        // console.log('decoded >>> ',decoded);
        let [username,password]= decoded.split(':'); //[username: password]
        // console.log('username');
       
try {
    
    let validUser = await  Users.authenticateBasic(username,password); 
    if (validUser) {
        req.user =validUser;
    
        next();
    }else{
        res.status(403).send('invalid dddddddddd');
    }

   
} catch (error) {
    res.status(403).send('invalid ddddddddddddd');
   
}

     
    }
}