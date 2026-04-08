import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class FilmTicketDto {
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsNumber()
  row: number;
  @IsNumber()
  seat: number;
  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilmTicketDto)
  tickets: FilmTicketDto[];
  @IsEmail()
  email: string;
  @IsString()
  phone: string;
}
