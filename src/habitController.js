import habitRepository from "./habitRepository.js";

class HabitController {

  //Render Add Habits page
  addHabitsPage(req, res) {
    res.render('habits/add');
  }

  //Calculate the longest streak of days where a habit has been marked done
  computeLongestStreak(dates) {
    const sortedDates = dates.sort((a, b) => new Date(a.date) - new Date(b.date));
    let longestStreak = 0;
    let currentStreak = 0;
    let lastDate = null;

    for (let { date, status } of sortedDates) {
      if (status === 'Done') {
        if (lastDate) {
          const currentDate = new Date(date);
          const previousDate = new Date(lastDate);
          previousDate.setDate(previousDate.getDate() + 1);
          if (currentDate.toISOString().split('T')[0] === previousDate.toISOString().split('T')[0]) {
            currentStreak++;
          } else {
            currentStreak = 1;
          }
        } else {
          currentStreak = 1;
        }
        lastDate = date;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
        lastDate = null;
      }
    }
    return longestStreak;
  }

  //Add habit
  async addHabit(req, res) {
    await habitRepository.createHabit({
      name: req.body.name,
      user: 'default',  // Assuming a default user
      dates: []
    });
    res.redirect('/habits');
  }

  //Show all habits
  async showAllHabits(req, res) {
    const habits = await habitRepository.getAllHabits('default');  // Assuming a default user
    const habitsWithStats = habits.map(habit => {
      const completedDays = habit.dates.filter(d => d.status === 'Done').length;
      const longestStreak = this.computeLongestStreak(habit.dates);
      return {
        ...habit._doc,
        completedDays,
        longestStreak
      };
    });
    res.render('habits/index', { habits: habitsWithStats });
  }

  //View details of a habit
  async viewHabitDetails(req, res) {
    const habit = await habitRepository.getHabitById(req.params.id);
    if (!habit) {
      return res.status(404).send('Habit not found');
    }
    const completedDays = habit.dates.filter(d => d.status === 'Done').length;
    const longestStreak = this.computeLongestStreak(habit.dates);
    res.render('habits/detail', { habit, completedDays, longestStreak });
  }

  //Update status of a habit for a specific date
  async updateHabitStatus(req, res) {
    await habitRepository.updateHabitById(req.params.id, req.body.date, req.body.status);
    res.redirect(`/habits/${req.params.id}`);
  }

  //Delete a habit
  async deleteHabit(req, res) {
    await habitRepository.deleteHabitById(req.params.id);
    res.redirect('/habits');
  }
}

export default new HabitController();
