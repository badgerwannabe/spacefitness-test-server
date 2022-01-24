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
    async editDay(
      _,
      { dayId, date, dayTrainings: [...dayTrainings] },
      context
    ) {
      console.table(dayTrainings);
      const currentDay = await Day.findById(dayId);

      if (date) {
        date = date;
      }

      if (dayTrainings) {
        dayTrainings.forEach((el) => {
          console.log(el);
        });
      } else {
        console.log("can't");
      }

      const updatedDay = await currentDay.save();
      return updatedDay;
    },
  },
};
