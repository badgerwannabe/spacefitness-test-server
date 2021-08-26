const Trainer = require("../../models/Trainer")

module.exports = {
    Query: {
        async getTrainers(){
            try{    
                const trainers = await Trainer.find();
                return trainers
            } catch (err){
                throw new Error (err);
            }
        }, 
        async getTrainer(_, { trainerId }, context) {
        try {
 
        
        const trainer = await Trainer.findById(trainerId);
 
        if (trainer) {
          return trainer;
        } else {
          throw new Error("Trainer not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
    Mutation:{
        async createTrainer (_, {name, description,email,phoneNumber, image}, context){
           
            if(name.trim() === ""){
              throw new Error('Name must not be empty')
            }
            if(description.trim() === ""){
              throw new Error('Description must not be empty')
            }
            if(email.trim() === ""){
              throw new Error('Email must not be empty')
            }
            if(phoneNumber.trim() === ""){
              throw new Error('PhoneNumber must not be empty')
            }
            if(image.trim() === ""){
              throw new Error('Please put a image url')
            }
            const newTrainer = new Trainer({
                name,
                description,
                email,
                phoneNumber,
                image,
                createdAt:  new Date().toISOString(),
      
            });
            const trainer = await newTrainer.save();
            return trainer;
        },
        async deleteTrainer(_, {trainerId}, context){
         
          try{
            const trainer = await Trainer.findById(trainerId)
            await trainer.delete();
            return 'Trainer deleted successfully'
          } catch(err){
            throw new Error(err)
          }
        },
        async editTrainer(_, {trainerId, name, description,email,phoneNumber}, context){

          const currentTrainer = await Trainer.findById(trainerId);
          console.log(currentTrainer)
          if(name ){
            currentTrainer.name = name;
          } 
          if(description){
            currentTrainer.description = description;
          }
          if(email){
            currentTrainer.email = email;
          }
          if(phoneNumber){
            currentTrainer.phoneNumber = phoneNumber;
          }      
          const updatedTrainer = await currentTrainer.save();
          return updatedTrainer;
      },
 
    }
} 