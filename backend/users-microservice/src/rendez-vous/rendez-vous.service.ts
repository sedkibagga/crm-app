import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRendezVousDto } from './dtos/CreateRendezVous.dto';
import { RendezVous } from 'src/typeorm/entities/RendezVous';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { UpdateRendezVousDto } from './dtos/updateRendezVous.dto';

@Injectable()
export class RendezVousService {
    constructor(
        @InjectRepository(RendezVous) private rendezVousRepository: Repository<RendezVous>,
        @InjectRepository(User) private userRepository: Repository<User>,
        jwtService: JwtService
    ){}

    async createRendezVous(createRendezVousDto: CreateRendezVousDto){
        const {commercial, ...res} = createRendezVousDto
        try{
            const comm = await this.userRepository.findOne({ where: { id: commercial },relations: ["rendez_vous"] });
            
            if (!comm) {
                throw new HttpException("commercial non trouvé", 404);
            }

            if (comm.role !== 'commercial') {
                throw new HttpException("Le commercial doit avoir le rôle 'commercial'", 400);
            }

            const commWithoutPassword = plainToClass(User, comm)

            const rendezVousCreated = this.rendezVousRepository.create({commercial:commWithoutPassword, ...res})
            await this.rendezVousRepository.save(rendezVousCreated);

            if (!comm.rendez_vous && comm.role==="commercial"){
                comm.rendez_vous = []
            }
            comm.rendez_vous.push(rendezVousCreated)
            await this.userRepository.save(comm);
            return {rendezVousCreated}
        } catch (error) {
            return new HttpException(error.message || "Error creating rendez-vous", 400);
        }
    }

    async updatePointDeVente(updateRendezVousDto: UpdateRendezVousDto, id:string){
        try{
            const findedById = await this.rendezVousRepository.findOne({where : {id}})
            if (!findedById){
                return new HttpException("point de vente not found", 400);
            }

            if (updateRendezVousDto.commercial) {
                const commercial = await this.userRepository.findOne({ where: { id: updateRendezVousDto.commercial } });
                if (!commercial) {
                    throw new HttpException("Commercial not found", 400);
                }
                findedById.commercial = commercial;
            }
            
            Object.assign(findedById, updateRendezVousDto);
            return await this.rendezVousRepository.save(findedById);

        } catch(error){
            console.log(error)
            return new HttpException(error.message || 'Error updating point de vente', 400);
        }
    }

    async getAllRendezVous(){
        const allRendezVous = await this.rendezVousRepository.find({relations:['commercial']})
        let commercialWithoutPassword = null
        return allRendezVous.map(rendezVous => {
            const {commercial, ...res} = rendezVous
            commercialWithoutPassword = plainToClass(User, commercial)
            return {...res, commercial: commercialWithoutPassword}
        })
        
    }

    async getRendezVousByCommercialAndStatut(commercialId: string) {
        try {
            const commercial = await this.userRepository.findOne({ where: { id: commercialId } });
            if (!commercial) {
                throw new HttpException("Commercial not found", 404);
            }

            return await this.rendezVousRepository.find({
                where: { commercial: { id: commercialId }, statut: 'not_done' } 
            });
        } catch (error) {
            console.log(error);
            throw new HttpException(error.message || 'Error fetching rendez-vous', 400);
        }
    }
}
