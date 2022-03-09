'use strict';

const express = require('express');
const router = express.Router();
const base64 = require('base-64');
const bcrybt = require('bcrypt');



const { Users } = require('./models/database');
// console.log(Users);
const basicAuth = require('./middleware/basic.auth');
const bearerAuth = require('./middleware/bearer.auth');


// console.log(Users);
router.get('/users', getUsers);
router.post('/signUp', signUp);
router.post('/signIn', basicAuth, signIn);
router.get('/secretstuff', bearerAuth, userHandler);

async function getUsers(req, res) {
    let users = await Users.findAll();
    res.json(users);
}

async function signUp(req, res) {

    let { userName, pwd } = req.body;
    // console.log(req.body);
    try {
        let hashedPwd = await bcrybt.hash(pwd, 5);
        // console.log('before create');
        const newUser = await Users.create({
            userName: userName,
            pwd: hashedPwd
        });
        // console.log('after create');
        res.status(201).json(newUser);
    } catch (error) {
        console.log(`Error from signUp function in router file ${error}`);
    }
}


// localhost:3000/sigIn >> Authorization >> 'Basic encoded(username:password)
function signIn(req, res) {
    //Send a basic authentication header with a properly encoded username and password combination
    res.status(200).json(req.user);

}


function userHandler(req, res) {
    // send the user information to the client & create new repo
    res.status(200).json(req.user);


}





module.exports = router;




