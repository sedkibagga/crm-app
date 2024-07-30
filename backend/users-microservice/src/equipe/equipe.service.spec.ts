import { Test, TestingModule } from '@nestjs/testing';
import { EquipeService } from './equipe.service';

describe('EquipeService', () => {
  let service: EquipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipeService],
    }).compile();

    service = module.get<EquipeService>(EquipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
