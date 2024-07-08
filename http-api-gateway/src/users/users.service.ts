import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/TypeOrm/entities/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/User.dto';

@Injectable()
export class UsersService {
    constructor() {}

    
}
