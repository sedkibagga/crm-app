import { Test, TestingModule } from '@nestjs/testing';
import { EquipeController } from './equipe.controller';

describe('EquipeController', () => {
  let controller: EquipeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipeController],
    }).compile();

    controller = module.get<EquipeController>(EquipeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
