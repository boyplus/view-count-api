import * as express from 'express';

const Router = express.Router();

// Routes
import TestRouter from './test.router';

Router.use('/test', TestRouter);

export default Router;
