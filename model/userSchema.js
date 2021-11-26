const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    name: String,
    address: String,
    contact: String,
    about: String,
    gender: String,
    avatar: {
        type: String,
        default: 'dummy.png'
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }],
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model('user', userSchema);