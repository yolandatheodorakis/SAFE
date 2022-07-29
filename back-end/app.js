const express = require('express');
const router = require('./routes.js');
const dbConnect = require('./dbConnect');

const app = express();

dbConnect();

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(router);

module.exports = app;