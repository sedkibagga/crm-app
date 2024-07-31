import { Module } from '@nestjs/common';
import { RendezVousController } from './rendez-vous.controller';
import { RendezVousService } from './rendez-vous.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { JwtModule } from '@nestjs/jwt';
import { RendezVous } from 'src/typeorm/entities/RendezVous';
import { User } from 'src/typeorm/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([RendezVous, User]) , NatsClientModule , JwtModule.register({
    secret: 'abc123',
    signOptions: { expiresIn: '1h' }, 
  }),],
  controllers: [RendezVousController],
  providers: [RendezVousService]
})
export class RendezVousModule {}
