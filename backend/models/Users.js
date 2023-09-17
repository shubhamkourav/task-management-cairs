const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('Users', usersSchema);
