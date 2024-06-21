import './env.js'
import express from 'express';
import habitRouter from './routes/habitRouter.js';
import { connectUsingMongoose } from './config/db.config.js';

const app = express();

app.use(express.urlencoded({ extended: true }));

//View engine configuration
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.use('/habits', habitRouter);

app.get('/', (req, res) => {
  res.redirect('/habits');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectUsingMongoose();
});
