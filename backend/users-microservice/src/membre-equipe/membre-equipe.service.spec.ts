import { Test, TestingModule } from '@nestjs/testing';
import { MembreEquipeService } from './membre-equipe.service';

describe('MembreEquipeService', () => {
  let service: MembreEquipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembreEquipeService],
    }).compile();

    service = module.get<MembreEquipeService>(MembreEquipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
