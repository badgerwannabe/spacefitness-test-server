const Person = require("../../models/Person");

module.exports = {
    Query: {
        async getPersons(){
            console.log("here")
            try{    
                const persons = await Person.find();
                return persons
            } catch (err){
                throw new Error (err);
            }
        }
    },

    Mutation:{
        async createPerson (_, {firstName,lastName, status,email,phoneNumber,heardFrom, healthNotes}, context){
           
            if(firstName.trim() === ""){
              throw new Error('First name must not be empty')
            }
            if(lastName.trim() === ""){
              throw new Error('Last name must not be empty')
            }
            if(email.trim() === ""){
              throw new Error('Email must not be empty')
            }
            if(phoneNumber.trim() === ""){
              throw new Error('PhoneNumber must not be empty')
            }
            if(status.trim() === ""){
              throw new Error('Status must not be empty')
            }
            if(heardFrom.trim() === ""){
              throw new Error('We should know from where person knows about studio')
            }
    
            const newPerson = new Person({
                firstName,
                lastName, 
                status,
                email,
                phoneNumber,
                heardFrom, 
                healthNotes,
                createdAt: new Date().toISOString(),
      
            });
            const person = await newPerson.save();
            return person;
        },
        
    }
}