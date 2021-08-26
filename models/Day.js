const {model, Schema} = require('mongoose');

const daySchema = new Schema({
    day: String,
    date: String,
    dayTrainings:[
        {  
           time: String,
            training: {
                type: Schema.Types.ObjectId,
                ref: 'trainings'
                     },
            trainer: {
                type: Schema.Types.ObjectId,
                ref: 'trainers'
                    }
       
        }
    ],
    createdAt: String,

})

module.exports = model('Day', daySchema);
