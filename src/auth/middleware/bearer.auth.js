'use strict';
const {Users} =require("../models/database");

module.exports = async (req,res,next)=>{
    if(req.headers['authorization']) {
        // 'Bearer token'
        let bearerHeaderParts= req.headers.authorization.split(' ');
        // console.log('bearerHeaderParts >>> ',bearerHeaderParts); // ['Bearer','token']
        let token = bearerHeaderParts.pop(); //encoded(username:password)
        // console.log('Token >>> ',token);
       
        try {
            let user =await Users.validateToken(token);
            if (user) {
                req.user =user;
                next();
            }else{
                res.status(403).send('invalid ddddddddddddd');
            }
        } catch (error) {
            res.status(403).send('invalid ddddddddddddd');
        }

    }
}