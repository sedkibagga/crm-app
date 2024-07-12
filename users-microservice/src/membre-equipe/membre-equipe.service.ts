import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipe } from 'src/typeorm/entities/Equipe';
import { MembreEquipe } from 'src/typeorm/entities/MembreEquipe';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { AjouterMembreDto } from './dtos/ajouterMembre.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class MembreEquipeService {
    constructor(
        @InjectRepository(Equipe) private equipeRepository: Repository<Equipe>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(MembreEquipe) private membreEquipeRepository: Repository<MembreEquipe>,
        private jwtService: JwtService
    ) {}

    async ajouterMembre(ajouterMembreDto: AjouterMembreDto) {
        const { id_membre, id_equipe } = ajouterMembreDto;

        const membre = await this.userRepository.findOne({ where: { id: id_membre } });
        let membreWithoutPassword = plainToClass(User, membre)
        if (!membreWithoutPassword) {
            throw new HttpException('Membre not found', HttpStatus.BAD_REQUEST);
        } else {
            if (membreWithoutPassword.role== "admin" || membreWithoutPassword.role== "chef_equipe") {
                throw new HttpException("Le membre doit avoir le rôle commercial ou sédentaire", HttpStatus.BAD_REQUEST);
            }
        }

        const equipe = await this.equipeRepository.findOne({ where: { id_equipe: id_equipe } });
        if (!equipe) {
            throw new HttpException('Equipe not found', HttpStatus.BAD_REQUEST);
        }

        const existingMembership = await this.membreEquipeRepository.findOne({ where: { membre } });
        if (existingMembership) {
            throw new HttpException('L\'utilisateur appartient déjà à une équipe', HttpStatus.BAD_REQUEST);
        }

        const membreEquipe = this.membreEquipeRepository.create({ membre: membreWithoutPassword, equipe });
        
        if (!equipe.membres) {
            equipe.membres = [];
        }
        equipe.membres.push(membreWithoutPassword);
        
        return await this.membreEquipeRepository.save(membreEquipe);
        
    }

    async deleteMembre(equipeId: string, membreId: string) {
        const membreEquipe = await this.membreEquipeRepository.findOne({
            where: { 
                equipe: { id_equipe: equipeId },
                membre: { id: membreId }
            }
        });

        if (!membreEquipe) {
            throw new Error('Membre not found in the equipe');
        }

        const res = await this.membreEquipeRepository.remove(membreEquipe);

        return {res,  message: 'Membre deleted successfully' };
    }
}
