import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        getAllFilms: jest.fn(),
        getFilmSchedule: jest.fn(),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getFilms - получаем фильмы', () => {
    it('вызываем у сервиса метод getAllFilms и возвращаем фильмы в поле items', async () => {
      const mockFilmsList = [
        {
          id: '1',
          title: 'Film 1',
          rating: 1,
          director: 'Director 1',
          tags: 'action',
          image: 'image.jpg',
          cover: 'cover.jpg',
          about: 'about',
          description: 'description',
          schedules: [],
        },
        {
          id: '2',
          title: 'Film 2',
          rating: 2,
          director: 'Director 2',
          tags: 'horror',
          image: 'image2.jpg',
          cover: 'cover2.jpg',
          about: 'about2',
          description: 'description2',
          schedules: [],
        },
      ];

      jest.spyOn(service, 'getAllFilms').mockResolvedValue(mockFilmsList);

      const result = await controller.getFilms();
      expect(service.getAllFilms).toHaveBeenCalled();
      expect(result).toEqual({ items: mockFilmsList });
    });
  });
  describe('getSchedule - получаем расписание фильма', () => {
    it('getFilmSchedule - вызываем у сервиса метод и возвращаем расписание фильма', async () => {
      const filmId = '123';
      const mockSchedule = {
        schedules: [
          {
            id: '1',
            daytime: '10:00',
            hall: 1,
            rows: 1,
            seats: 1,
            price: 100,
            taken: [],
          },
          {
            id: '2',
            daytime: '11:00',
            hall: 2,
            rows: 2,
            seats: 2,
            price: 100,
            taken: [],
          },
        ],
      };

      jest
        .spyOn(service, 'getFilmSchedule')
        .mockResolvedValue(mockSchedule as any);

      const result = await controller.getSchedule(filmId);
      expect(service.getFilmSchedule).toHaveBeenCalledWith(filmId);
      expect(result).toEqual({ items: mockSchedule.schedules });
    });
     it(' getFilmSchedule - вызываем у сервиса метод и возвращаем пустое расписание', async () => {
      const filmId = '321';
      const mockSchedule = {
        schedules: [],
      };

      jest
        .spyOn(service, 'getFilmSchedule')
        .mockResolvedValue(mockSchedule as any);

      const result = await controller.getSchedule(filmId);
      expect(service.getFilmSchedule).toHaveBeenCalledWith(filmId);
      expect(result).toEqual({ items: mockSchedule.schedules });
    });
  });
});
