const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;