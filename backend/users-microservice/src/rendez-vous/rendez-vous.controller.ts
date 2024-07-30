import { Controller } from '@nestjs/common';
import { RendezVousService } from './rendez-vous.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRendezVousDto } from './dtos/CreateRendezVous.dto';
import { UpdateRendezVousDto } from './dtos/updateRendezVous.dto';

@Controller('rendez-vous')
export class RendezVousController {
    constructor(private rendezVousService: RendezVousService){}

    @MessagePattern({cmd: "create_rendez-vous"})
    async createRendezVous(@Payload() data: CreateRendezVousDto){
        return this.rendezVousService.createRendezVous(data)
    }

    @MessagePattern({cmd: "update_rendez-vous"})
    async updateRendezVous(@Payload() payload: { data: UpdateRendezVousDto, id: string }) {
        const { data, id } = payload;
        return this.rendezVousService.updatePointDeVente(data, id);
    }

    @MessagePattern({cmd:"get_all_rendez-vous"})
    async getAllRendezVous(){
        return this.rendezVousService.getAllRendezVous()
    }

    @MessagePattern({cmd: "get_rendez-vous"})
    async getRendezVous(@Payload() userId: string) {
        return this.rendezVousService.getRendezVousByCommercialAndStatut(userId);
    }
}