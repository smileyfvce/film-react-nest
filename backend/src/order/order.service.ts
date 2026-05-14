import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const { tickets } = createOrderDto;
    const result = [];

    for (const ticket of tickets) {
      const { film: filmId, session: scheduleId, row, seat, price } = ticket;
      const place = `${row}:${seat}`;

      const film = await this.filmRepository.findOne({ where: { id: filmId } });
      if (!film) {
        throw new NotFoundException(`Фильма c id ${filmId} не существует`);
      }

      const schedule = await this.scheduleRepository.findOne({
        where: { id: scheduleId, film: { id: filmId } },
        relations: ['film'],
      });
      if (!schedule) {
        throw new NotFoundException(`Сеанса c id ${scheduleId} не существует`);
      }

      const takenSeats =
        schedule.taken && schedule.taken.trim() !== ''
          ? schedule.taken.split(',')
          : [];

      if (takenSeats.includes(place)) {
        throw new BadRequestException(`Место ${place} занято`);
      }

      takenSeats.push(place);
      schedule.taken = takenSeats.join(',');
      await this.scheduleRepository.save(schedule);

      result.push({
        id: randomUUID(),
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
