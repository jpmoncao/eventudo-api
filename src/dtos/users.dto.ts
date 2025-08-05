  import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsDate, IsDateString, IsEmpty } from 'class-validator';

  export class CreateUserDto {
    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32)
    public password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    public name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    public lastName: string;

    @IsString()
    @IsNotEmpty()
    public birthDate: string;

    @IsString()
    @IsNotEmpty()
    public cpf: string;

    @IsString()
    @IsNotEmpty()
    public phone: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(100)
    public address: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    public city: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    public state: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(10)
    public zipCode: string;
  }

  export class LoginUserDto {
    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(9)
    @MaxLength(32)
    public password: string;
  }

  export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(9)
    @MaxLength(32)
    public password: string;
  }
