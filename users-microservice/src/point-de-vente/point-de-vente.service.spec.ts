import { Test, TestingModule } from '@nestjs/testing';
import { PointDeVenteService } from './point-de-vente.service';

describe('PointDeVenteService', () => {
  let service: PointDeVenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointDeVenteService],
    }).compile();

    service = module.get<PointDeVenteService>(PointDeVenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
