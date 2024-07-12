import { Test, TestingModule } from '@nestjs/testing';
import { PointDeVenteController } from './point-de-vente.controller';

describe('PointDeVenteController', () => {
  let controller: PointDeVenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointDeVenteController],
    }).compile();

    controller = module.get<PointDeVenteController>(PointDeVenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
