import { Body, Controller, Delete, ForbiddenException, Get, HttpException, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto, LoginUserDto } from './dto/User.dto';
import { jwtAuthGuard } from './guards/jwt-guard';
import { RolesGuard } from './guards/roles-guard';
import { Roles } from './decorators/roles.decorator';
import { RolesEnum } from './Roles/Roles.enum';
@Controller('users')
export class UsersController {
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {} 
  

    async verificationAuth(@Req() req: any, id: string): Promise<void> {
      const userAuthenticatedId = req.user.id; 
      console.log("req.user:", req.user);
      console.log("userAuthenticatedId:", userAuthenticatedId);
      if (userAuthenticatedId !== id) {
        throw new ForbiddenException('You are not authorized to access this resource');
      }
    }



  @Post('create')
  createUser (@Body() createuserDto: CreateUserDto) { 

    return this.natsClient.send({ cmd: 'create_user' }, createuserDto)
      
  } 

  @Post('login') 

  LoginUser (@Body() loginUserDto : LoginUserDto ) {
   
    return this.natsClient.send({ cmd: 'login_user' }, loginUserDto)
  } 

 
  @Get('userById/:id') 
  @UseGuards(jwtAuthGuard)
  async getUserById(@Param('id') id: string , @Req() req) {
    try {
      console.log ("id" , id);
      console.log("req.user",req.user)
      await this.verificationAuth(req, id);
      return this.natsClient.send({ cmd: 'get_user_by_id' }, id);
  } catch (error) {
    if (error instanceof ForbiddenException) {
      return error;
    } else {
      return new HttpException('Internal server error', 500);
    }
  }

  } 
  @Get('admin/all')
   @UseGuards(jwtAuthGuard,RolesGuard)
   @Roles(RolesEnum.ADMIN)
   getAllUsers(@Req() req) {
    try {
      console.log("req.user",req.user)
      console.log("role:" , RolesEnum.ADMIN);
    return  this.natsClient.send({ cmd: 'get_all_users' }, {}) ;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        return error;
      } else {
        return new HttpException('Internal server error', 500);
      }
    }
  }

  @Delete("/deleteUser/:id")
  @UseGuards(jwtAuthGuard,RolesGuard)
  @Roles(RolesEnum.ADMIN)
  async deleteUser(@Param("id") id: string) {
    return this.natsClient.send({ cmd: "delete_user" }, id);
  }

   


   
}
