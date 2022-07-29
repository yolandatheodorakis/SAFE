const express = require('express');
const {signup, login, isAuth} = require('./auth.js');

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

router.get('/private', isAuth);

module.exports = router;