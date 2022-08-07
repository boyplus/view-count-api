import * as express from 'express';
import { Request, Response } from 'express';

// Controllers
import AuthController from '../controllers/auth/auth.controller';

// DTO
import { SignupRequestDto } from '../controllers/auth/dto/signup-request.dto';
import { SigninRequestDto } from '../controllers/auth/dto/signin-request.dto';

// Erorr handling
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
      const response = await authController.register({ email, password, name });
      res.send(response);
    } catch (error: any) {
      res.status(error.statusCode).send({ message: error.message });
    }
  }
);

Router.post(
  '/login',
  dtoValidationMiddleware(SigninRequestDto),
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const response = await authController.login({ email, password });
      res.send(response);
    } catch (error: any) {
      res.status(error.statusCode).send({ message: error.message });
    }
  }
);

export default Router;
