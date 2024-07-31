import { Test, TestingModule } from '@nestjs/testing';
import { RendezVousController } from './rendez-vous.controller';

describe('RendezVousController', () => {
  let controller: RendezVousController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RendezVousController],
    }).compile();

    controller = module.get<RendezVousController>(RendezVousController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
