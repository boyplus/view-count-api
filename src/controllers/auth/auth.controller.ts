import { Body, Controller, Post, SuccessResponse, Tags, Route } from 'tsoa';
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcryptjs';

// DTO
import { SignupRequestDto } from './dto/signup-request.dto';
import { SigninRequestDto } from './dto/signin-request.dto';

// Entity
import { Admin } from '../../entity';

// Utils
import { ApiError } from '../../utils/ApiError';
import { sign } from 'jsonwebtoken';

@Tags('Auth')
@Route('auth')
export default class AuthController extends Controller {
  @Post('/register')
  @SuccessResponse('201', 'Admin Registration')
  public async register(
    @Body() { email, password, name }: SignupRequestDto
  ): Promise<{ token: string }> {
    try {
      const existingAdmin = await Admin.findOne({ where: { email } });
      if (existingAdmin) throw new ApiError(400, 'Email is already used.');

      const admin = new Admin();
      admin.id = uuidv4();
      admin.email = email;
      admin.name = name;
      admin.password = await hash(password, 10);

      const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

      const token = sign(
        {
          id: admin.id,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15,
        },
        JWT_SECRET_KEY
      );

      await admin.save();

      return { token };
    } catch (error: any) {
      if (error instanceof ApiError) throw error;
      else throw new ApiError(500, error);
    }
  }

  @Post('/login')
  @SuccessResponse('201', 'Admin Login')
  public async login(
    @Body() { email, password }: SigninRequestDto
  ): Promise<{ token: string }> {
    try {
      const admin = await Admin.findOne({ where: { email } });
      // If user is not found
      if (!admin)
        throw new ApiError(
          400,
          'Your eamil or your password might not correct.'
        );

      const isPasswordMatch = await compare(password, admin.password);
      if (!isPasswordMatch) {
        throw new ApiError(
          400,
          'Your eamil or your password might not correct.'
        );
      }

      const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

      const token = sign(
        {
          id: admin.id,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15,
        },
        JWT_SECRET_KEY
      );

      return { token };
    } catch (error: any) {
      if (error instanceof ApiError) throw error;
      else throw new ApiError(500, error);
    }
  }
}
