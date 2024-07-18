import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { NatsClientModule } from './nats-client/nats-client.module';
import { Equipe } from './typeorm/entities/Equipe';
import { EquipeModule } from './equipe/equipe.module';
import { MembreEquipe } from './typeorm/entities/MembreEquipe';
import { MembreEquipeModule } from './membre-equipe/membre-equipe.module';
import { PointDeVenteModule } from './point-de-vente/point-de-vente.module';
import { PointDeVente } from './typeorm/entities/PointDeVente';
import { RendezVousModule } from './rendez-vous/rendez-vous.module';
import { RendezVous } from './typeorm/entities/RendezVous';

@Module({
  imports: [
    UsersModule ,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT, 10),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [User, Equipe, MembreEquipe, PointDeVente, RendezVous],
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    }) ,
    

    TypeOrmModule.forFeature([User, Equipe, MembreEquipe, PointDeVente, RendezVous]) ,
    NatsClientModule,
    EquipeModule,
    MembreEquipeModule,
    PointDeVenteModule,
    RendezVousModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
