import { HttpException, Injectable } from '@nestjs/common';
import { PointDeVenteDto } from './dtos/pointDeVente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PointDeVente } from 'src/typeorm/entities/PointDeVente';
import { Repository } from 'typeorm';
import { UpdatePointDeVenteDto } from './dtos/updatePointDeVente.dto';

@Injectable()
export class PointDeVenteService {
    @InjectRepository(PointDeVente) private pointDeVenteRepository: Repository<PointDeVente>

    async ajouterPointDeVente(pointDeVenteDto: PointDeVenteDto){
        try{
            const {nom, prenom, num_tel} = pointDeVenteDto
            const finded = await this.pointDeVenteRepository.findOne({where: {num_tel, nom, prenom}})
            if (finded){
                return new HttpException("Point de Vente already exists", 400);
            }
            const pointDeVenteAdded = this.pointDeVenteRepository.create(pointDeVenteDto)
            return await this.pointDeVenteRepository.save(pointDeVenteAdded)
        } catch(error){
            console.log(error)
            return new HttpException(error.message || 'Error adding point de vente', 400);
        }
    }

    getAllPointDeVente(){
        const pointDeVente = this.pointDeVenteRepository.find()
        return pointDeVente
    }

    async updatePointDeVente(updatePointDeVenteDto: UpdatePointDeVenteDto, id:string){
        try{
            const findedById = await this.pointDeVenteRepository.findOne({where : {id}})
            if (!findedById){
                return new HttpException("point de vente not found", 400);
            } else {
                return await this.pointDeVenteRepository.update(id,updatePointDeVenteDto)
            }

        } catch(error){
            console.log(error)
            return new HttpException(error.message || 'Error adding point de vente', 400);
        }
    }
}
