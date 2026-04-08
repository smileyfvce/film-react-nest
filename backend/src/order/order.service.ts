import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Film, FilmDocument } from '../films/schema/film.schema';
import { CreateOrderDto } from './dto/order.dto';
import { faker } from '@faker-js/faker';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  5;
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const { tickets } = createOrderDto;
    const result = [];

    for (const ticket of tickets) {
      const { film: filmId, session: scheduleId, row, seat, price } = ticket;
      const place = `${row}:${seat}`;

      const film = await this.filmModel.findOne({ id: filmId }).exec();
      if (!film) {
        throw new NotFoundException(`Фильма c id ${filmId} не существует`);
      }

      const schedule = await film.schedule.find((sch) => sch.id === scheduleId);

      if (!schedule) {
        throw new NotFoundException(`Сеанса c id ${scheduleId} не существует`);
      }

      if (schedule.taken.includes(place)) {
        throw new BadRequestException(`Место ${place} занято`);
      }

      schedule.taken.push(place);
      await film.save();

      result.push({
        id: faker.string.uuid(),
        film: filmId,
        session: scheduleId,
        row,
        seat,
        price,
        daytime: schedule.daytime,
      });
    }
    return { items: result };
  }
}
