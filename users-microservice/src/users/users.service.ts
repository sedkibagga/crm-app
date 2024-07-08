import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dtos/userDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'typeorm/entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

   constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) { }

   async createUser(createUserDto: CreateUserDto) {
      try {
         const { email, password, ...user } = createUserDto
         const findedByEmail = await this.userRepository.findOne({ where: { email } });
         if (findedByEmail) {
           return new HttpException("email already exist", 400);
         }
         const salt = await bcrypt.genSalt();
         const hashedPassword = await bcrypt.hash(password, salt);
         console.log(hashedPassword);
         const userCreated = this.userRepository.create({ ...user, password: hashedPassword, email: email });
         return await this.userRepository.save(userCreated)

      } catch (error) {

         return new HttpException(error.message || 'Error creating user', 400);

      }

   }

   async loginUser(loginUserDto: LoginUserDto) {
      try {
         const { email, password } = loginUserDto;
         const userFindedByEmail = await this.userRepository.findOne({ where: { email } });
         if (!userFindedByEmail) {
            return new HttpException("user not found", 400);
         } else {
            const verifyPassword = await bcrypt.compare(password, userFindedByEmail.password);
            if (!verifyPassword) {
               return new HttpException('Incorrect password', 400);
            } else {
               const payload = { sub: userFindedByEmail.id, nom: userFindedByEmail.nom , role : userFindedByEmail.role };
                    const token = this.jwtService.sign(payload);
                    return { token: token, email: userFindedByEmail.email, nom: userFindedByEmail.nom, prenom: userFindedByEmail.prenom , role : userFindedByEmail.role };
            }
         }

      } catch (error) {
         return new HttpException(error.message || 'Error logging in', 400);
      }

   }

   async getUserById (id:string) {
      try{ 

         const user :User = await this.userRepository.findOne({ where: { id } });
         if (!user) {
            return new HttpException("user not found", 400);
         } else {
            const {password, ...result} = user ;
            return result;
         }

      } catch(error) { 

         return new HttpException(error.message || 'Error getting user', 400);


      }
      
   } 

   getAllUsers () {
      const users : Promise<User[]> = this.userRepository.find() ; 
      return users ;
   } 

   async deletUserById (id : string)  {
      try { 
         const findedUseById = await this.userRepository.findOne({ where: { id } });
         if (!findedUseById) {
            throw new HttpException("user not found", 400);
         } else {
             await this.userRepository.delete({ id });
             const {password , num_tel , ...result} = findedUseById ;
             return result
         }

      } catch(error) {

         throw new HttpException(error.message || 'Error deleting user', 400);

      }
   }





}
