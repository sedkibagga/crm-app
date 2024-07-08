import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto, LoginUserDto } from './dtos/userDto';
@Controller('users')
export class UsersController {
    constructor(private userService : UsersService){

    }

    @MessagePattern({cmd:'create_user'}) 

    async createUser (@Payload() data : CreateUserDto) {

        return await this.userService.createUser(data)
    } 

    @MessagePattern({cmd:'login_user'})
    async loginUser (@Payload() data : LoginUserDto) {
        console.log(data);
       return await this.userService.loginUser(data) ;
        
    } 

    @MessagePattern({cmd:'get_user_by_id'})
    async getUserById(@Payload() id : string) {
        return await this.userService.getUserById(id);
       
    } 

    @MessagePattern({cmd:'get_all_users'}) 
    getAllUsers(){
        return this.userService.getAllUsers() ;
    }
    @MessagePattern({cmd:'delete_user'})
    async deleteUser(@Payload() id : string) {
        return await this.userService.deletUserById(id);
    }

}
