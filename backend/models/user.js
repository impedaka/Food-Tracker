const { Schema } = require("mongoose");
const mongoose = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timesatmps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;