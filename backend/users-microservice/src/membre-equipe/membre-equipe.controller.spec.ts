import { Test, TestingModule } from '@nestjs/testing';
import { MembreEquipeController } from './membre-equipe.controller';

describe('MembreEquipeController', () => {
  let controller: MembreEquipeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembreEquipeController],
    }).compile();

    controller = module.get<MembreEquipeController>(MembreEquipeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
