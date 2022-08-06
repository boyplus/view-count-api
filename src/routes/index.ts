import * as express from 'express';

const Router = express.Router();

// Routes
import TestRouter from './test.router';
import AuthRouter from './auth.router';

Router.use('/test', TestRouter);
Router.use('/auth', AuthRouter);

export default Router;
