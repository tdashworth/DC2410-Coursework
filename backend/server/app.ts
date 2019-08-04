import * as dotenv from 'dotenv';
import express from 'express';
import * as path from 'path';

// Put dotenv in use before importing controllers
dotenv.config();

// Import controllers
import adoptionRequestsController from './adoptionRequests/adoptionRequests.controller';
import animalsController from './animals/animals.controller';
import usersController from './users/users.controller';

// Create the express application
const app = express();

// Assign controllers to routes
app.use('/api/users', usersController);
app.use('/api/animals', animalsController);
app.use('/api/requests', adoptionRequestsController);

// Declare the path to frontend's static assets
app.use(express.static(path.resolve('..', 'frontend', 'build')));

// Intercept requests to return the frontend's static entry point
app.get('*', (req, res) => {
  res.sendFile(path.resolve('..', 'frontend', 'build', 'index.html'));
});

export default app;
