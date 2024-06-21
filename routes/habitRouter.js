import express from 'express';
import habitController from '../src/habitController.js';
//Habit Router
const habitRouter = express.Router();

//Render the add habits page
habitRouter.get('/add',habitController.addHabitsPage.bind(habitController))

//Add habit for a default user
habitRouter.post('/', habitController.addHabit.bind(habitController));

// Show all habits
habitRouter.get('/', habitController.showAllHabits.bind(habitController));

// View habit details and statuses
habitRouter.get('/:id', habitController.viewHabitDetails.bind(habitController));

// Update habit status for a specific date
habitRouter.post('/update/:id', habitController.updateHabitStatus.bind(habitController));

// Delete a habit
habitRouter.post('/delete/:id', habitController.deleteHabit.bind(habitController));

export default habitRouter;
