import { Controller, Get, SuccessResponse } from 'tsoa';

import { AppDataSource } from '../database/dataSource';
import { Admin } from '../entity';

export default class TestController extends Controller {
  @Get('/')
  @SuccessResponse('200', 'Tets route')
  public async hello(): Promise<string> {
    return 'test';
  }
}
