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
      entities: [User, Equipe, MembreEquipe],
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    }) ,
    

    TypeOrmModule.forFeature([User, Equipe, MembreEquipe]) ,
    NatsClientModule,
    EquipeModule,
    MembreEquipeModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
