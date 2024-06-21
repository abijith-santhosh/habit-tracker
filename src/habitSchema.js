
import mongoose from 'mongoose';

//Date Schema
const dateSchema = new mongoose.Schema({
  date: String,
  status: String
});

//Habit Schema
const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  dates: [dateSchema],
  createdDate: {
    type: Date,
    default: Date.now
  }
});


//Habit model
const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
