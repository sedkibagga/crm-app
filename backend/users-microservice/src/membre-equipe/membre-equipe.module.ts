import { Module } from '@nestjs/common';
import { MembreEquipeService } from './membre-equipe.service';
import { MembreEquipeController } from './membre-equipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Equipe } from 'src/typeorm/entities/Equipe';
import { MembreEquipe } from 'src/typeorm/entities/MembreEquipe';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Equipe, MembreEquipe]) , NatsClientModule , JwtModule.register({
    secret: 'abc123',
    signOptions: { expiresIn: '1h' }, 
  }),],
  providers: [MembreEquipeService],
  controllers: [MembreEquipeController]
})
export class MembreEquipeModule {}
