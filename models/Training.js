const { model, Schema } = require("mongoose");

const trainingSchema = new Schema({
  trainingName: String,
  trainingDescription: String,
  trainerName: String,
  trainerId: {
    type: Schema.Types.ObjectId,
    ref: "trainers",
  },
  createdAt: String,
  trainingImage: String,
});

module.exports = model("Training", trainingSchema);
