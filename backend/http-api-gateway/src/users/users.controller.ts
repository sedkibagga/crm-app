import { Body, Controller, Delete, ForbiddenException, Get, HttpException, Inject, Param, Patch, Post, Req, Request, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto, LoginUserDto } from './dto/User.dto';
import { jwtAuthGuard } from './guards/jwt-guard';
import { RolesGuard } from './guards/roles-guard';
import { Roles } from './decorators/roles.decorator';
import { RolesEnum } from './Roles/Roles.enum';
import { CreateEquipeDto } from './dto/equipe.dto';
import { AjouterMembreDto } from './dto/ajouterMembre.dto';
import { PointDeVenteDto } from './dto/pointDeVente.dto';
import { UpdatePointDeVenteDto } from './dto/updatePointDeVente.dto';
import { CreateRendezVousDto } from './dto/CreateRendezVous.dto';
import { UpdateRendezVousDto } from './dto/updateRendezVous.dto';
import { UpdateEquipeDto } from './dto/updateEquipe.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { commentsDto, updateCommentDto } from './dto/comments.dto';


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
  @UseGuards(jwtAuthGuard,RolesGuard)
  @Roles(RolesEnum.ADMIN)
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
  
  @Post("admin/create/equipe")
  @UseGuards(jwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  createEquipe(@Body() createEquipeDto: CreateEquipeDto){
    return this.natsClient.send({ cmd: 'create_equipe' }, createEquipeDto)
  }
  
  @Get("admin/getEquipes")
  @UseGuards(jwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  getAllEquipes(@Req() req){
    return this.natsClient.send({cmd: 'get_all_equipes'}, {})
  }

  @Delete("admin/deleteEquipe/:id")
  @UseGuards(jwtAuthGuard,RolesGuard)
  @Roles(RolesEnum.ADMIN)
  async deleteEquipe(@Param("id") id: string) {
    return this.natsClient.send({ cmd: "delete_equipe" }, id);
  }

  @Post("ajouterMembre")
  @UseGuards(jwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.CHEF_EQUIPE)
  ajouterMembre(@Body() ajouterMembreDto: AjouterMembreDto){
    return this.natsClient.send({cmd: "ajouter_membre"}, ajouterMembreDto)
  }

  @Delete('admin/deleteMembre/:equipeid/:membreid')
  @UseGuards(jwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.CHEF_EQUIPE)
  async deleteMembre(@Param('equipeid') equipeid: string, @Param('membreid') membreid: string) {
    return this.natsClient.send({ cmd: "delete_membre" }, {equipeid,membreid});
  }

  @Post('ajouterPointDeVente')
  @UseGuards(jwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.COMMERCIAL)
  ajouterPointDeVente(@Body() pointDeVenteDto:PointDeVenteDto){
    try{
      return this.natsClient.send({cmd: "ajouter_point_de_vente"}, pointDeVenteDto)
    } catch(error) {
      return error
    }
  }

  @Get("getPointDeVente")
  @UseGuards(jwtAuthGuard)
  getPointDeVente(@Req() req){
    return this.natsClient.send({cmd: 'get_all_point_de_vente'}, {})
  }

  @Patch('update/pointDeVente/:id')
  @UseGuards(jwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.COMMERCIAL, RolesEnum.SEDENTAIRE)
  updatePointDeVente(@Body() data: UpdatePointDeVenteDto, @Param("id") id: string){
    return this.natsClient.send({cmd: 'update_point_de_vente'}, {data, id})
  }

  @Post('ajouterRendezVous')
  @UseGuards(jwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.SEDENTAIRE)
  ajouterRendezVous(@Body() createRendezVousDto: CreateRendezVousDto){
    try{
      return this.natsClient.send({cmd: "create_rendez-vous"}, createRendezVousDto)
    } catch (error) {
      return error
    }
  }

  @Patch('update/rendezVous/:id')
  @UseGuards(jwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.COMMERCIAL)
  updateRendezVous(@Body() data: UpdateRendezVousDto, @Param("id") id:string){
    return this.natsClient.send({cmd: 'update_rendez-vous'}, {data, id})
  }

  @Get("getRendezVous")
  @UseGuards(jwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.COMMERCIAL)
  async getNotDoneRendezVous(@Request() req) {
    const userId = req.user.id;
    return this.natsClient.send({cmd: 'get_rendez-vous'}, userId)
  }

  @Get("getAllRendezVous")
  @UseGuards(jwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.SEDENTAIRE)
  async getAllRendezVous(){
    return this.natsClient.send({cmd:"get_all_rendez-vous"}, {})
  }
  
  @Patch("/update/equipe/:id")
  @UseGuards(jwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  async updateEquipe(@Body() data: UpdateEquipeDto, @Param("id") id:string){
    return this.natsClient.send({cmd: 'update_equipe'}, {data, id})
  }

  @Patch("updateUser/:id")
  @UseGuards(jwtAuthGuard)
  async updateUser(@Param('id') id: string , @Req() req, @Body() data: UpdateUserDto){
    try {
      await this.verificationAuth(req, id);
      return this.natsClient.send({ cmd: 'update_user' }, {id, data});
    } catch (error) {
      if (error instanceof ForbiddenException) {
        return error;
      } else {
        return new HttpException('Internal server error', 500);
      }
    }
  }

  @Patch("changePassword/:id")
  @UseGuards(jwtAuthGuard)
  async changePassword(@Param('id') id: string , @Req() req, @Body() data: ChangePasswordDto){
    try {
      await this.verificationAuth(req, id);
      return this.natsClient.send({ cmd: 'change_password' }, {id, data});
    } catch (error) {
      if (error instanceof ForbiddenException) {
        return error;
      } else {
        return new HttpException('Internal server error', 500);
      }
    }
  }

  @Post ("ajouterCommentaire/:id")
  @UseGuards(jwtAuthGuard)
  async ajouterCommentaire(@Param('id') id: string , @Req() req, @Body() data: commentsDto){
    try {
      await this.verificationAuth(req, id);
      console.log ("id in api gateway : " , id , "data in api gateway : " , data);
      return this.natsClient.send({ cmd:'ajouter_commentaire'}, {id , data});
    } catch (error) {
      if (error instanceof ForbiddenException) {
        return error;
      } else {
        return new HttpException('Internal server error', 500);
      }
    }
  } 

  @Delete("supprimerComment/:id/:commentId")
  @UseGuards(jwtAuthGuard) 
  async deleteCommantaire(@Param('id') id: string , @Param('commentId') commentId: string , @Req() req){
    try {
      await this.verificationAuth(req, id);
      return this.natsClient.send({ cmd: 'supprimer_commentaire' }, {id, commentId});
    } catch (error) {
      if (error instanceof ForbiddenException) {
        return error;
      } else {
        return new HttpException('Internal server error', 500);
      }
    }
  }

@Patch('modifierCommentaire/:id/:commentId')
@UseGuards(jwtAuthGuard)
async updateComment(
  @Param('id') id: string,
  @Param('commentId') commentId: string,
  @Req() req,
  @Body() data: updateCommentDto
) {
  try {
    await this.verificationAuth(req, id);
    const response = await this.natsClient.send({ cmd: 'modifier_commentaire' }, { id, data, commentId });
    console.log("Update response:", response);
    return response;
  } catch (error) {
    console.error("Error in updateComment:", error.message);
    if (error instanceof ForbiddenException) {
      return error;
    } else {
      return new HttpException('Internal server error', 500);
    }
  }
}



  @Get('Commentaires/:id')
  @UseGuards(jwtAuthGuard)
  async getAllCommentaires(@Param('id') id: string, @Req() req) {
    try {
      await this.verificationAuth(req, id);
      return this.natsClient.send({ cmd: 'get_all_commentaires' }, id);
    } catch (error) {
      if (error instanceof ForbiddenException) {
        return error;
      } else {
        return new HttpException('Internal server error', 500);
      }
    }
  }


}
