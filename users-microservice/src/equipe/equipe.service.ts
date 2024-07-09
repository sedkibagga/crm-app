import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipe } from 'src/typeorm/entities/Equipe';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateEquipeDto } from './dtos/equipe.dto';

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
                throw new HttpException("Chef d'équipe non trouvé", 404);
            }

            if (chefEquipe.role !== 'chef_equipe') {
                throw new HttpException("Le chef d'équipe doit avoir le rôle 'chef_equipe'", 400);
            }

            const equipeCreated = this.equipeRepository.create({
                secteur,
                lieu,
                nom,
                chefEquipe
            });

            await this.equipeRepository.save(equipeCreated);
            
            if (!chefEquipe.equipes_chef) {
                chefEquipe.equipes_chef = [];
            }
            chefEquipe.equipes_chef.push(equipeCreated);
            await this.userRepository.save(chefEquipe);

            return equipeCreated;
        } catch (error) {
            throw new HttpException(error.message || "Error creating Equipe", 400);
        }
    }
}


   