import * as express from 'express';
import { Request, Response } from 'express';

import AuthController from '../controllers/auth/auth.controller';
import { SignupRequestDto } from '../controllers/auth/dto/signup-request.dto';
import { ApiError } from '../utils/ApiError';
import dtoValidationMiddleware from '../utils/Validator';

const Router = express.Router();

const authController = new AuthController();

Router.post(
  '/register',
  dtoValidationMiddleware(SignupRequestDto),
  async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;
      const msg = await authController.register({ email, password, name });
      res.send({ msg });
    } catch (error: any) {
      res.status(500).send({ error: 'Internal Server Error.' });
    }
  }
);

export default Router;
