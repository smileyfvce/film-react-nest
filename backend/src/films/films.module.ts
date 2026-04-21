import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsRepository } from 'src/repository/films.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from 'src/entities/film.entity';
import { Schedule } from 'src/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository],
})
export class FilmsModule {}
