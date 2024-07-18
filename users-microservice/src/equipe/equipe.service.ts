import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipe } from 'src/typeorm/entities/Equipe';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateEquipeDto } from './dtos/equipe.dto';
import { plainToClass } from 'class-transformer';
import { UpdateEquipeDto } from './dtos/updateEquipe.dto';

@Injectable()
export class EquipeService {
    constructor(
        @InjectRepository(Equipe) private equipeRepository: Repository<Equipe>,
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async createEquipe(createEquipeDto: CreateEquipeDto) {
        const { id_chefEquipe, secteur, lieu, nom } = createEquipeDto;
        try {
            const chefEquipe = await this.userRepository.findOne({ where: { id: id_chefEquipe } });
            
            if (!chefEquipe) {
                return new HttpException("Chef d'équipe non trouvé", 404);
            }

            if (chefEquipe.role !== 'chef_equipe') {
                return new HttpException("Le chef d'équipe doit avoir le rôle 'chef_equipe'", 400);
            }

            const chefWithoutPassword = plainToClass(User, chefEquipe)

            const equipeCreated = this.equipeRepository.create({
                secteur,
                lieu,
                nom,
                chefEquipe: chefWithoutPassword
            });

            await this.equipeRepository.save(equipeCreated);
            
            if (!chefEquipe.equipes_chef && chefEquipe.role === "chef_equipe") {
                chefEquipe.equipes_chef = [];
            }
            chefEquipe.equipes_chef.push(equipeCreated);
            await this.userRepository.save(chefEquipe);

            return {chefEquipe, ...equipeCreated};
        } catch (error) {
            return new HttpException(error.message || "Error creating Equipe", 400);
        }
    }

    // async getAllEquipes() {
    //     const equipes = await this.equipeRepository.find({ relations: ['chefEquipe', 'membres', 'membres.membre'] });
    //     return equipes.map(equipe => {
    //         const {membres ,chefEquipe, ...resEquipe } = equipe;
    //         let chefWithoutPassword: Partial<User>
    //         let membresWithoutPassword: Partial<MembreEquipe>[] = []

    //         // let membresWithoutPassword: Partial<User>
    //         if (chefEquipe) {
    //             const { password, ...resChef } = chefEquipe;
    //             chefWithoutPassword = resChef
    //         }
    //         membres.map(membreEquipe => {
    //             const { password, ...resMembre } = membreEquipe;
    //             membresWithoutPassword.push(resMembre)
    //             console.log(resMembre)
    //             console.log(membresWithoutPassword)
    //         });
    //         return {...resEquipe, chefEquipe: chefWithoutPassword, membres: membresWithoutPassword};
    //     });
    // }

    async getAllEquipes() {
        const equipes = await this.equipeRepository.find({ relations: ['chefEquipe', 'membres', 'membres.membre'] });
        let membresWithoutPassword: Partial<User>[] = []
        return equipes.map(equipe => {
            const { membres, chefEquipe, ...resEquipe } = equipe;
            let chefWithoutPassword = null;
            if (chefEquipe) {
                chefWithoutPassword = plainToClass(User, chefEquipe);
            }
            membres.map(membreEquipe => {
                const membreWithoutPassword = plainToClass(User, membreEquipe);
                membresWithoutPassword.push(membreWithoutPassword)
                return { ...membreEquipe, membre: membreWithoutPassword };
            });

            return { ...resEquipe, chefEquipe: chefWithoutPassword, membres: membresWithoutPassword };
        });
    }

    async deleteEquipe(id: string){
        try {
            const findEquipeById = await this.equipeRepository.findOne({where: {id_equipe: id}})
            if(!findEquipeById){
                return new HttpException("Equipe not found", HttpStatus.BAD_REQUEST)
            } else{
                await this.equipeRepository.delete(id)
                return findEquipeById
            }

        } catch (error) {
            return new HttpException('Error deleting equipe', HttpStatus.BAD_REQUEST)
        }
    }

    async updateEquipe(updateEquipeDto: UpdateEquipeDto, id:string){
        try{
            const findedById = await this.equipeRepository.findOne({where : {id_equipe:id}})
            if (!findedById){
                return new HttpException("Equipe not found", 400);
            } else {
                return await this.equipeRepository.update(id,updateEquipeDto)
            }

        } catch(error){
            console.log(error)
            return new HttpException(error.message || 'Error adding Equipe', 400);
        }
    }
}