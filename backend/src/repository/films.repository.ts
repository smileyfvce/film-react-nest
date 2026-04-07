import { Injectable } from '@nestjs/common';
import { Film } from 'src/films/schema/film.schema';

@Injectable()
export class FilmsRepository {
  async getFilms() {
    return Film.find().exec();
  }
  async getFilmSchedule(id: string) {
    return Film.findOne({ id }).exec();
  }
}
