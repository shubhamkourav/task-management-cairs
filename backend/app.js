const express = require('express');
const cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors('*'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const userRoutes = require('./routes/usersRoutes');
const taskRoutes = require('./routes/tasksRoutes');

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});