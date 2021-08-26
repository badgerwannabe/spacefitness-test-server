const {model, Schema} = require('mongoose');

const trainingSchema = new Schema({
    trainingName: String,
    trainingDescription: String,
    trainerName: String,
    trainer: {
        type: Schema.Types.ObjectId,
        ref: 'trainers'
    },
    createdAt: String,
    image: String,


})

module.exports = model('Training', trainingSchema);
