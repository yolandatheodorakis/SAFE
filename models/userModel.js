const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name!'],
        unique: false,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email!'],
        unique: [true, 'Email exists!']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        unique: false,
    }
});

module.exports = mongoose.model.Users || mongoose.model('Users', UserSchema);