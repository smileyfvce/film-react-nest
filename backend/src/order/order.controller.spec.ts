import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        createOrder: jest.fn(),
      })
      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('createOrder - создание заказа', () => {
    it('createOrder - вызываем метод сервиса и возвращаем результат', async() => {
      const mockOrder = {
        tickets: [{film: '1', session: '1', row: 1, seat: 1, price: 100}],
        email: 'test@example.com',
        phone: '123456789'
      }
      
      jest
        .spyOn(service, 'createOrder')
        .mockResolvedValue(mockOrder as any);
      
      const newOrder = await controller.createOrder(mockOrder);

      expect(service.createOrder).toHaveBeenCalledWith(mockOrder)
    })
  })
});
