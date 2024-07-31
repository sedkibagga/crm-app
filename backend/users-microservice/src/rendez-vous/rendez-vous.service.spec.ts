import { Test, TestingModule } from '@nestjs/testing';
import { RendezVousService } from './rendez-vous.service';

describe('RendezVousService', () => {
  let service: RendezVousService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RendezVousService],
    }).compile();

    service = module.get<RendezVousService>(RendezVousService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
