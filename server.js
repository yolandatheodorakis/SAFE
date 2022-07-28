const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbConnect = require('./db/dbConnect');
const User = require('./models/userModel');
const auth = require('./auth');

// Body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dbConnect();

// Curb Cors Error by adding a header here
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
});

app.get('/', (request, response, next) => {
    response.json({message: 'Hey! This is the server response!'});
    next();
});

// Register endpoint
app.post('/register', (request, response) => {
    bcrypt.hash(request.body.password, 10)
    .then((hashedPassword) => {
        // Create a new user instance and collect the data
        const user = new User({
            name: request.body.name,
            email: request.body.email,
            password: hashedPassword,
        });
        // Save the new user
        user.save()
        // Return success if the new user is added to the database successfully
        .then((result) => {
            response.status(201).send({
                message: 'User created successfully!',
                result,
            });
        })
        // Catch error if the new user wasn't added successfully to the database
        .catch((error) => {
            response.status(500).send({
                message: 'Error creating user.',
                error,
            });
        });
    })
    // Catch error if the password hash isn't successful
    .catch((e) => {
        response.status(500).send({
            message: 'Password was not hashed successfully!',
            e,
        });
    });
});

// Login endpoint
app.post('/login', (request, response) => {
    // Check if email exists
    User.findOne({email: request.body.email})
    // If email exists
    .then((user)=>{
        bcrypt.compare(request.body.password, user.password)
        // If the passwords match
        .then((passwordCheck) => {
            // Check if password matches
            if(!passwordCheck) {
              return response.status(400).send({
                message: 'Passwords do not match.',
                error,
              });
            }
            // Create JWT token
            const token = jwt.sign(
                {
                userId: user._id,
                userEmail: user.email,
                },
                'RANDOM-TOKEN',
                {expiresIn: '24h'}
            );
            // Return success response
            response.status(200).send({
                message: 'Login Successful',
                email: user.email,
                token
            });
        })
        // Catch error if password does not match
        .catch((error) => {
            response.status(400).send({
            message: 'Passwords do not match.',
            error,
            });
        });
    })
    // Catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: 'Email not found.',
        e,
      });
    });
});

// Free endpoint
app.get('/free-endpoint', (request, response) => {
    response.json({ message: 'You are free to access me anytime.' });
});
  
  // Authentication endpoint
  app.get('/auth-endpoint', auth, (request, response) => {
    response.json({ message: 'You are authorized to access me.' });
});

module.exports = app;