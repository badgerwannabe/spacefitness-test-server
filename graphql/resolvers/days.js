const Day = require("../../models/Day");

module.exports = {
  Query: {
    async getDays() {
      console.log("here");
      try {
        const days = await Day.find();
        return days;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createDay(_, { date, dayTrainings: [dayTrainings] }, context) {
      //   const dayTrainings = [
      //     {
      //       time: "23:15:00",
      //       training: "60e9e735461bf816848abedc",
      //       trainer: "60d8b2ee22aeef2f84572285",
      //     },
      //     {
      //       time: "18:00:00",
      //       training: "60e9e7580a6b113b2486113a",
      //       trainer: "60d8b1ff4ef7680174e9428b",
      //     },
      //   ];

      //deep copy which disconnects
      // let copiedDay = JSON.parse(JSON.stringify(day));
      // console.log(copiedDay)
      const newDay = new Day({
        date: dayDate,
        dayTrainings: [dayTrainings],
        createdAt: new Date().toISOString(),
      });
      console.log(newDay);
      const day = await newDay.save();
      return day;
    },
  },
};
