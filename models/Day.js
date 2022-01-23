const { model, Schema } = require("mongoose");

const daySchema = new Schema({
  date: String,
  dayTrainings: [
    {
      time: String,
      training: {
        type: Schema.Types.ObjectId,
        ref: "trainings",
      },
    },
  ],
  createdAt: String,
});

module.exports = model("Day", daySchema);
