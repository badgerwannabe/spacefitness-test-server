const trainerResolvers = require("./trainers");
const trainingResolvers = require("./trainings");
const dayResolvers = require("./days")
const personResolvers = require("./persons")
const adminResolvers = require('./admins')



module.exports = {

    Query: {
        ...trainerResolvers.Query,
        ...trainingResolvers.Query,
        ...dayResolvers.Query,
        ...personResolvers.Query
    },
    Mutation: {
        ...adminResolvers.Mutation,
        ...trainerResolvers.Mutation,
        ...trainingResolvers.Mutation,
        ...dayResolvers.Mutation,
        ...personResolvers.Mutation
    }
    
}