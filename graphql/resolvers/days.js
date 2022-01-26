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
    async getDay(_, { id }, context) {
      try {
        const day = await Day.findById(id);
        if (day) {
          return day;
        } else {
          throw new Error("Day not found");
        }
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
    async deleteDay(_, { id }, context) {
      try {
        const day = await Day.findById(id);
        await day.delete();
        return "Day deleted successfully";
      } catch (err) {
        throw new Error(err);
      }
    },
    async editDay(_, { id, date, dayTrainings: [...dayTrainings] }, context) {
      // console.table(dayTrainings);
      const currentDay = await Day.findById(id);
      // console.log(currentDay);

      if (date) {
        date = date;
      }

      if (dayTrainings) {
        //NEW TRY

        const res = dayTrainings.reduce((acc, curr) => {
          const stored = currentDay.dayTrainings.find(
            ({ id }) => id === curr.dayTrainingId
          );
          // console.log(stored);

          if (stored) {
            stored.time = curr.time;
            stored.training = curr.training;
            acc.push(curr);
          } else {
            acc.push(curr);
          }
          return acc;
        }, []);
        console.log(res);

        ///YET ANOTHER TRY

        // function mergeArrayObjects(arr1, arr2) {
        //loop through arr1
        //loop through arr2
        //if id is the same > update values
        //make sure this obj is updated in arr1

        //   let newArr = [...arr1];
        //   newArr[0] = { ...newArr[0], ...arr2[0] };
        //   newArr[1] = { ...newArr[1], ...arr2[1] };
        //   console.log(newArr[0].time);
        //   console.log(newArr[1].time);
        //   return newArr;
        // }
        // let newTrainings = mergeArrayObjects(
        //   currentDay.dayTrainings,
        //   dayTrainings
        // );
        currentDay.dayTrainings = res;
      }

      const updatedDay = await currentDay.save();
      return updatedDay;
    },
  },
};
