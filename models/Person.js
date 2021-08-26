const {model, Schema} = require('mongoose');

const personSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    status: String,
    healthNotes: String,
    heardFrom: String,
    createdAt: String,

})

module.exports = model('Person', personSchema);