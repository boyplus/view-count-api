import * as express from 'express';
import { Request, Response } from 'express';

import TestController from '../controllers/test.controller';

const Router = express.Router();

const testController = new TestController();

Router.get('/', async (req: Request, res: Response) => {
  const msg = await testController.hello();
  res.send({ msg });
});

export default Router;
