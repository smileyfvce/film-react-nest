import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}
  @Get()
  async getFilms() {
    const films = await this.filmsService.getAllFilms();
    return { items: films };
  }
  @Get(':id/schedule')
  async getSchedule(@Param('id') id: string) {
    const film = await this.filmsService.getFilmSchedule(id);
    return { items: film.schedule };
  }
}
