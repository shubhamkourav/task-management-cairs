const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
},{
    timestamps: true
});

module.exports = mongoose.model('Tasks', tasksSchema);
