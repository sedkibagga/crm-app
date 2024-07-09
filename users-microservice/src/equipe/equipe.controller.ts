import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateEquipeDto } from './dtos/equipe.dto';
import { EquipeService } from './equipe.service';

@Controller('equipe')
export class EquipeController {
    constructor(private equipeService : EquipeService){}
    
    @MessagePattern({cmd:'create_equipe'}) 
    async createUser (@Payload() data : CreateEquipeDto) {
        return await this.equipeService.createEquipe(data)
    }
    
}
