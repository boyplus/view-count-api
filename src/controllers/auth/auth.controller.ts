import { Body, Controller, Post, SuccessResponse, Tags, Route } from 'tsoa';
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcryptjs';

// DTO
import { SignupRequestDto } from './dto/signup-request.dto';

// Entity
import { Admin } from '../../entity';

// Utils
import { ApiError } from '../../utils/ApiError';
import { sign } from 'jsonwebtoken';
import { SigninRequestDto } from './dto/signin-request.dto';

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
      if (existingAdmin) throw new ApiError(400, 'Email is already used');

      const admin = new Admin();
      admin.id = uuidv4();
      admin.email = email;
      admin.name = name;
      admin.password = await hash(password, 10);

      await admin.save();

      const JWT_SECRET = process.env.JWT_SECRET as string;

      const token = sign(
        {
          id: admin.id,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15,
        },
        JWT_SECRET
      );

      return { token };
    } catch (error: any) {
      throw new ApiError(500, error);
    }
  }

  @Post('/login')
  @SuccessResponse('201', 'Admin Login')
  public async login(
    @Body() { email, password }: SigninRequestDto
  ): Promise<Admin> {
    return new Admin();
  }
}
