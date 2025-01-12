import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsStrongPassword,
} from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  fullName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  @MinLength(8)
  password: string;
}
