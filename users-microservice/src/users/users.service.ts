import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dtos/userDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { ChangePasswordDto } from './dtos/changePassword.dto';

@Injectable()
export class UsersService {

   constructor(
      @InjectRepository(User) private userRepository: Repository<User>, 
      private jwtService: JwtService
   ) {}

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
         
         return plainToClass(User, await this.userRepository.save(userCreated))

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
                    return { token: token, email: userFindedByEmail.email, nom: userFindedByEmail.nom, prenom: userFindedByEmail.prenom , role : userFindedByEmail.role , id : userFindedByEmail.id };
            }
         }

      } catch (error) {
         return new HttpException(error.message || 'Error logging in', 400);
      }

   }

   async getUserById (id:string) {
      try{ 
         const user :User = await this.userRepository.findOne({ where: { id } , relations: ['equipes_chef', 'rendez_vous']});
         if (!user) {
            return new HttpException("user not found", 400);
         } else {
            
            if (user.role === "chef_equipe") {
               const userModified =  {...user, rendez_vous: undefined};
               return plainToClass(User, userModified);
            } else if (user.role === "commercial") {
               const userModified =  {...user,equipes_chef: undefined};
               return plainToClass(User, userModified);
            }  else {
               const userModified =  {...user, equipes_chef: undefined, rendez_vous: undefined};
               return plainToClass(User, userModified);
            }
         }
      } catch(error) { 
         return new HttpException(error.message || 'Error getting user', 400);
      }
   } 

   async getAllUsers () {
      const users = await this.userRepository.find({
         relations: ['equipes_chef', 'rendez_vous'],
       });

       const filteredUsers = users.map(user => {
         if (user.role === "chef_equipe") {
            return {...user, rendez_vous: undefined};
         } else if (user.role === "commercial") {
           return {...user, equipes_chef: undefined};
         }  else {
            return {...user, equipes_chef: undefined, rendez_vous: undefined};
          }
      });
      return plainToClass(User, filteredUsers);
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

   async updateUser(updateUserDto: UpdateUserDto, id: string){
      const user = await this.userRepository.findOne({where: {id}})
      if (!user){
         return new HttpException("User not found", HttpStatus.NOT_FOUND)
      }
      Object.assign(user, updateUserDto)

      return plainToClass(User,this.userRepository.save(user))
   }

   async changePassword(changePasswordDto: ChangePasswordDto, id:string){
      const {currentPassword, newPassword, confirmPassword} = changePasswordDto
      const user = await this.userRepository.findOne({where: {id}})

      if (!user) {
         return new HttpException("User not found", HttpStatus.NOT_FOUND)
      }

      const isValid = await bcrypt.compare(currentPassword, user.password)
      if (!isValid){
         return new HttpException("Password is not matching the current password", HttpStatus.BAD_REQUEST)
      }

      if (newPassword !== confirmPassword){
         return new HttpException("Passwords are not matching", HttpStatus.BAD_REQUEST)
      }

      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(confirmPassword, salt);

      return plainToClass(User,this.userRepository.save(user))
   }
}
