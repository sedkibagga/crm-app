import { Controller } from '@nestjs/common';
import { PointDeVenteService } from './point-de-vente.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PointDeVenteDto } from './dtos/pointDeVente.dto';
import { UpdatePointDeVenteDto } from './dtos/updatePointDeVente.dto';

@Controller('point-de-vente')
export class PointDeVenteController {
    constructor (private pointDeVenteService: PointDeVenteService){}

    @MessagePattern({cmd:'ajouter_point_de_vente'})
    async ajouterPointDeVente(@Payload() data:PointDeVenteDto){
        console.log(data)
        return await this.pointDeVenteService.ajouterPointDeVente(data)
    }

    @MessagePattern({cmd: 'get_all_point_de_vente'})
    getAllPointDeVente(){
        return this.pointDeVenteService.getAllPointDeVente() ;
    }
    
    @MessagePattern({ cmd: 'update_point_de_vente' })
    async updatePointDeVente(@Payload() payload: { data: UpdatePointDeVenteDto, id: string }) {
        const { data, id } = payload;
        return this.pointDeVenteService.updatePointDeVente(data, id);
    }
}
