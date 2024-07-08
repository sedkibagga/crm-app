import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'typeorm/entities/User';
import { NatsClientModule } from './nats-client/nats-client.module';

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
      entities: [User],
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    }) ,
    

    TypeOrmModule.forFeature([User]) ,
    NatsClientModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
