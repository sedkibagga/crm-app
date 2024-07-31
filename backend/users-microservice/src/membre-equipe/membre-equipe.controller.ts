import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MembreEquipeService } from './membre-equipe.service';
import { AjouterMembreDto } from './dtos/ajouterMembre.dto';

@Controller('membre-equipe')
export class MembreEquipeController {
    constructor(private membreEquipeService: MembreEquipeService){}

    @MessagePattern({cmd:'ajouter_membre'}) 
    async createUser (@Payload() data : AjouterMembreDto) {
        return await this.membreEquipeService.ajouterMembre(data)
    }

    @MessagePattern({ cmd: 'delete_membre' })
    async deleteUser(@Payload() data: { equipeid: string; membreid: string }) {
        const { equipeid, membreid } = data;
        return await this.membreEquipeService.deleteMembre(equipeid, membreid);
    }
}
