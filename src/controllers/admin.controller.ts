import { Body, Controller, Post, SuccessResponse, Tags, Route } from 'tsoa';

import { ApiError } from '../utils/ApiError';

@Tags('Admin')
@Route('admin')
export default class AdminController extends Controller {
  @Post('/register')
  @SuccessResponse('201', 'Admin Registration')
  public async register(
    @Body() { email, password }: { email: string; password: string }
  ): Promise<string> {
    try {
      return email + ' ' + password;
    } catch (error: any) {
      throw new ApiError(500, error);
    }
  }
}
