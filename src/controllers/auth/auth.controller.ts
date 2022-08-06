import { Body, Controller, Post, SuccessResponse, Tags, Route } from 'tsoa';
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcryptjs';

// DTO
import { SignupRequestDto } from './dto/signup-request.dto';

// Entity
import { Admin } from '../../entity';

// Utils
import { ApiError } from '../../utils/ApiError';

@Tags('Auth')
@Route('auth')
export default class AuthController extends Controller {
  @Post('/register')
  @SuccessResponse('201', 'Admin Registration')
  public async register(
    @Body() { email, password }: SignupRequestDto
  ): Promise<string> {
    try {
      const existingAdmin = await Admin.findOne({ where: { email } });
      if (existingAdmin) throw new ApiError(400, 'Email is already used');

      const admin = new Admin();
      admin.id = uuidv4();
      admin.email = email;
      admin.password = await hash(password, 10);

      // await admin.save();
      return process.env.JWT_SECRET_KEY as string;
    } catch (error: any) {
      throw new ApiError(500, error);
    }
  }
}
