"use strict";

const express =require('express');
const cors =require('cors');
const UsersRouter =require('./auth/router');
const handler500=require("./auth/error-handler/500");   
const handler404=require("./auth/error-handler/404");

const app =express();
app.use(express.json());
app.use(cors());
app.use(UsersRouter);



function start(port) {

    app.listen(port, ()=>{
        console.log(`server is running on port ${port}`);
    })
    
}

app.use("*",handler404);
app.use(handler500);


module.exports ={
    app:app,
    start:start
}