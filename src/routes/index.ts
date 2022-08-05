import * as express from 'express';

const Router = express.Router();

// Routes
import TestRouter from './test.router';
import AdminRouter from './admin.router';

Router.use('/test', TestRouter);
Router.use('/admin', AdminRouter);

export default Router;
