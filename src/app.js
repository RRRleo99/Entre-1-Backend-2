import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import passport from './config/passport.js';
import sessionsRouter from './routes/sessions.js';
import usersRouter from './routes/users.js';





const app = express();

app.use('/api/users', usersRouter);
app.use(express.json());
app.use(passport.initialize());

app.use('/api/sessions', sessionsRouter);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

export default app;