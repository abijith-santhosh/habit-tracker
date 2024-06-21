import Habit from "./habitSchema.js";

class HabitRepository {

  //Create habit
  async createHabit(habitData) {
    const newHabit = new Habit(habitData);
    return await newHabit.save();
  }

  //Get all habits for default user
  async getAllHabits(user) {
    return await Habit.find({ user });
  }

  //Get a habit by id
  async getHabitById(id) {
    return await Habit.findById(id);
  }


//Update habit details by ID
  async updateHabitById(id, date, status) {
    const habit = await Habit.findById(id);
    if (!habit) {
      throw new Error('Habit not found');
    }
    const existingDate = habit.dates.find(d => d.date === date);
    if (existingDate) {
      existingDate.status = status;
    } else {
      habit.dates.push({ date, status });
    }
    return await habit.save();
  }

  //Delete a habit by ID
  async deleteHabitById(id) {
    return await Habit.findByIdAndDelete(id);
  }
}

export default new HabitRepository();
