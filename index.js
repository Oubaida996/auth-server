"use strict";

const server =require('./src/server');
const {db} = require('./src/auth/models/database.js');
require('dotenv').config();

db.sync().then(()=>{
    server.start(process.env.PORT || 3001);   
   })

   
   