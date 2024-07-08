import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'typeorm/entities/User';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { JwtModule } from '@nestjs/jwt';
import { Constants } from 'src/constants/constants';

@Module({
    imports: [TypeOrmModule.forFeature([User]) , NatsClientModule , JwtModule.register({
        secret: 'abc123',
        signOptions: { expiresIn: '1h' }, 
      }),],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
