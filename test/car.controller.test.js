import { getAllCars } from '../src/controllers/cars.controller.js';
import Car from '../src/models/car.js';

jest.mock('../src/models/car.js', () => ({
  __esModule: true,
  default: {
    find: jest.fn()
  }
}));

describe('Cars Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  test('getAllCars devuelve lista de coches', async () => {
    const mockCars = [
      { brand: 'Toyota', model: 'Yaris', year: 2020 },
      { brand: 'BMW', model: 'X1', year: 2021 }
    ];
    Car.find.mockResolvedValue(mockCars);

    await getAllCars(req, res);

    expect(Car.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockCars);
  });
});