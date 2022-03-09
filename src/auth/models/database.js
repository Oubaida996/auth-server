"use strict"



const { Sequelize, DataTypes } = require('sequelize');
const Users =require('./user.model');
require('dotenv').config();


const POSTGRES_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;


const sequelizeOptions = process.env.NODE_ENV === 'development' ?   {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
}:{};

const db = new Sequelize(POSTGRES_URL,sequelizeOptions);



module.exports ={
    db :db,
    Users :Users(db ,DataTypes)

}