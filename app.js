require('dotenv').config();
var models = require("./app/models");
const express = require('express');
const AWS = require('aws-sdk');


const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroSequelize = require('@admin-bro/sequelize')

const userUploadOptions = require('./app/resources/admin.user');
const categoryUploadOptions = require('./app/resources/admin.category');

AdminBro.registerAdapter(AdminBroSequelize)
const adminBro = new AdminBro({
  databases: [models],
  branding: {
    companyName: 'User menu',
  },
  rootPath: "/admin",
  resources: [ 
    categoryUploadOptions  ,
    userUploadOptions
    ]
});

var app = express();
app.use(express.json());    //parse the body and if its json, parse it into json object
app.use(express.urlencoded({ extended: true})); //parses the request with url encoded payload and populate req.body with the  key value pair

const router = AdminBroExpress.buildRouter (adminBro)
app.use(adminBro.options.rootPath, router)

//sync Database
models.sequelize
    .sync()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

module.exports = app;
