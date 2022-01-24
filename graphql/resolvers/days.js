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
    async createDay(_, { date, dayTrainings: [...dayTrainings] }, context) {
      // console.table(dayTrainings);
      //deep copy which disconnects
      // let copiedDay = JSON.parse(JSON.stringify(day));
      // console.log(copiedDay)

      const newDay = new Day({
        date: date,
        dayTrainings: [...dayTrainings],
        createdAt: new Date().toISOString(),
      });
      // console.log(newDay);
      const day = await newDay.save();
      return day;
    },
    async deleteDay(_, { dayId }, context) {
      try {
        const day = await Day.findById(dayId);
        await day.delete();
        return "Day deleted successfully";
      } catch (err) {
        throw new Error(err);
      }
    },
    async editDay(_, { id, date, dayTrainings: [...dayTrainings] }, context) {
      console.table(dayTrainings);
      const currentDay = await Day.findById(id);
      console.log(currentDay);

      if (date) {
        date = date;
      }

      if (dayTrainings) {
        currentDay.dayTrainings.map((item) => {
          console.log(item);
          let item2 = dayTrainings.find((i2) => i2.id === item.id);
          console.log(item2);
        });

        // dayTrainings.forEach((el) => {
        //   console.log(el);
        //   currentDay.dayTrainings.push(el);
        // });
      }

      const updatedDay = await currentDay.save();
      return updatedDay;
    },
  },
};
