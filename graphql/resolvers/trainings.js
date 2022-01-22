const Trainer = require("../../models/Trainer");
const Training = require("../../models/Training");

module.exports = {
  Query: {
    async getTrainings() {
      try {
        const trainings = await Training.find();

        return trainings;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getTraining(_, { trainingId }, context) {
      try {
        const training = await Training.findById(trainingId);

        if (training) {
          return training;
        } else {
          throw new Error("Training not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createTraining(
      _,
      { trainingName, trainingDescription, trainerId, image },
      context
    ) {
      const trainer = await Trainer.findById(trainerId);

      if (trainingName.trim() === "") {
        throw new Error("Training Name must not be empty");
      }
      if (trainingDescription.trim() === "") {
        throw new Error("Description must not be empty");
      }
      if (!trainerId) {
        throw new Error("Trainer must be chosen");
      }
      if (image.trim() === "") {
        throw new Error("Enter image url");
      }

      const newTraining = new Training({
        trainingName,
        trainingDescription,
        trainer: trainer.id,
        trainerName: trainer.name,
        createdAt: new Date().toISOString(),
      });
      console.log(newTraining);
      const training = await newTraining.save();
      return training;
    },
    async deleteTraining(_, { trainingId }, context) {
      try {
        const training = await Training.findById(trainingId);
        await training.delete();
        return "Training deleted successfully";
      } catch (err) {
        throw new Error(err);
      }
    },
    async editTraining(
      _,
      { trainingId, trainingName, trainingDescription, trainer },
      context
    ) {
      const currentTraining = await Training.findById(trainingId);

      if (trainingName) {
        currentTraining.trainingName = trainingName;
      }
      if (trainingDescription) {
        currentTraining.trainingDescription = trainingDescription;
      }
      if (trainer) {
        const newTrainer = await Trainer.findById(trainer);
        currentTraining.trainer = newTrainer.id;
        currentTraining.trainerName = newTrainer.name;
      }

      const updatedTraining = await currentTraining.save();
      return updatedTraining;
    },
  },
};
