import { IsArray, IsEmail, IsNumber, IsString } from 'class-validator';

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
  tickets: FilmTicketDto[];
  @IsEmail()
  email: string;
  @IsString()
  phone: string;
}
