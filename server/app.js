const express = require('express');
const cors = require('cors');
const loginRoute = require('./routes/login-route');
const tasksRoute = require('./routes/tasks-route');
const teamRoute = require('./routes/team-route');
const userRoute = require('./routes/user-route');

const bodyParser = require('body-parser');
require('./driver/mongo-driver');

const app = express();

const port = 3030;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/login', loginRoute);
app.use('/api/tasks', tasksRoute);
app.use('/api/teams', teamRoute);
app.use('/api/users', userRoute);

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
