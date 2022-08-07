import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import extractToken from './extract-token';

import { Admin } from '../entity';

// Error
import { ApiError } from '../utils/ApiError';

const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractToken(req);
    console.log('token', token);
    if (token) {
      const decoded = verify(
        token,
        process.env.JWT_SECRET_KEY as string
      ) as any;
      const admin = await Admin.findOne({ where: { id: decoded.id } });
      if (!admin) throw new ApiError(401, 'Unauthorized');

      req.user = { id: admin.id };
      next();
    } else {
      throw new ApiError(401, 'Unauthorized');
    }
  } catch (error: any) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, error.message);
  }
};

export default AuthMiddleware;
