import { Controller, Req } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateEquipeDto } from './dtos/equipe.dto';
import { EquipeService } from './equipe.service';
import { UpdateEquipeDto } from './dtos/updateEquipe.dto';

@Controller('equipe')
export class EquipeController {
    constructor(private equipeService : EquipeService){}
    
    @MessagePattern({cmd:'create_equipe'}) 
    async createUser (@Payload() data : CreateEquipeDto) {
        return await this.equipeService.createEquipe(data)
    }

    @MessagePattern({cmd: 'get_all_equipes'})
    getAllEquipes(){
        return this.equipeService.getAllEquipes()
    }
    
    @MessagePattern({cmd:'delete_equipe'})
    async deleteUser(@Payload() id : string) {
        return await this.equipeService.deleteEquipe(id);
    }

    @MessagePattern({cmd: "update_equipe"})
    async updateEquipe(@Payload() payload: { data: UpdateEquipeDto, id: string }) {
        const { data, id } = payload;
        return this.equipeService.updateEquipe(data, id);
    }
}
