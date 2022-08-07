import { IsEmail, IsString, Min, MinLength } from 'class-validator';

export class SigninRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
