import * as express from 'express';
import { Request, Response } from 'express';

import AdminController from '../controllers/admin.controller';

const Router = express.Router();

const adminController = new AdminController();

Router.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const msg = await adminController.register({ email, password });
  res.send({ msg });
});

export default Router;
