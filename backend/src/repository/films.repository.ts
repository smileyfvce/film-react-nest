import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/entities/film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>
  ) {}
  async getFilms() {
    return this.filmRepository.find();
  }
  async getFilmSchedule(id: string) {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedules'],
      order: {
        schedules: { daytime: 'ASC' },
      },
    });
    if (!film) {
      throw new NotFoundException(`Фильм с id ${id} не существует`);
    }
    return film;
  }
}
