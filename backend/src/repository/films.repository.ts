import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from 'src/films/schema/film.schema';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}
  async getFilms() {
    return this.filmModel.find().exec();
  }
  async getFilmSchedule(id: string) {
    const film = await this.filmModel.findOne({ id }).exec();
    if (!film) {
      throw new NotFoundException(`Фильм с id ${id} не существует`);
    }
    return film;
  }
}
