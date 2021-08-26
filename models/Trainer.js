const {model, Schema} = require('mongoose');

const trainerSchema = new Schema({
    name: String,
    description: String,
    email: String,
    phoneNumber: String,
    createdAt: String,
    image: String,
})

module.exports = model('Trainer', trainerSchema);
