const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('./models/userModel');

const signup = (req, res, next) => {
    // Checks if email already exists
    Users.findOne({
        email: req.body.email
    })
    .then(dbUser => {
        if (dbUser) {
            return res.status(409).json({message: 'email already exists'});
        } 
        else if (req.body.name && req.body.email && req.body.password) {
            // Password hash
            bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: 'couldnt hash the password'});
                } 
                else if (passwordHash) {
                    return Users.create(({
                        name: req.body.name,
                        email: req.body.email,
                        password: passwordHash
                    }))
                    .then(() => {
                        res.status(200).json({message: 'user created'});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({message: 'error while creating the user'});
                    });
                };
            });
        } 
        else if (!req.body.password) {
            return res.status(400).json({message: 'password not provided'});
        } 
        else if (!req.body.email) {
            return res.status(400).json({message: 'email not provided'});
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const login = (req, res, next) => {
    // Checks if email exists
    Users.findOne({
        email: req.body.email
    })
    .then(dbUser => {
        if (!dbUser) {
            return res.status(404).json({message: 'user not found'});
        } 
        else {
            // Password hash
            bcrypt.compare(req.body.password, dbUser.password, (err, compareRes) => {
                if (err) {// Error while comparing
                    res.status(502).json({message: 'error while checking user password'});
                } 
                else if (compareRes) {// Password match
                    const token = jwt.sign({email: req.body.email}, 'secret', {expiresIn: '1h'});
                    res.status(200).json({message: 'user logged in', 'token': token});
                } 
                else {// Password doesn't match
                    res.status(401).json({message: 'invalid credentials'});
                };
            });
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const isAuth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json({message: 'not authenticated'});
    };
    const token = authHeader.split(' ')[1];
    let decodedToken; 
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        return res.status(500).json({message: err.message || 'could not decode the token'});
    };
    if (!decodedToken) {
        res.status(401).json({message: 'unauthorized'});
    } else {
        res.status(200).json({message: 'here is your resource'});
    };
};

module.exports = {signup, login, isAuth};