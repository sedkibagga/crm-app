import { Module } from '@nestjs/common';
import { EquipeController } from './equipe.controller';
import { EquipeService } from './equipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Equipe } from 'src/typeorm/entities/Equipe';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Equipe]) , NatsClientModule , JwtModule.register({
    secret: 'abc123',
    signOptions: { expiresIn: '1h' }, 
  }),],
  controllers: [EquipeController],
  providers: [EquipeService]
})
export class EquipeModule {}
