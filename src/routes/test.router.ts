import * as express from 'express';
import { Request, Response } from 'express';

const Router = express.Router();

Router.get('/', (req: Request, res: Response) => {
  res.send({ msg: 'Hello wolrd' });
});

export default Router;
