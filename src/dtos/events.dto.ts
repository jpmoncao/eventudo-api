import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsDateString,
  IsNumber,
  IsPositive
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @IsNotEmpty()
  public name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(500)
  @IsNotEmpty()
  public description: string;

  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @IsNotEmpty()
  public short_description: string;

  @IsDateString()
  @IsNotEmpty()
  public date: string; // Use string com ISO format, ex: "2025-07-14T19:00:00Z"

  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @IsNotEmpty()
  public location: string;

  @IsString()
  @MinLength(5)
  @MaxLength(200)
  @IsNotEmpty()
  public address: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public price: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public id_category: number;
}
