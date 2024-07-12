import { Module } from '@nestjs/common';
import { PointDeVenteController } from './point-de-vente.controller';
import { PointDeVenteService } from './point-de-vente.service';
import { PointDeVente } from 'src/typeorm/entities/PointDeVente';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([PointDeVente]) , NatsClientModule , JwtModule.register({
    secret: 'abc123',
    signOptions: { expiresIn: '1h' }, 
  }),],
  controllers: [PointDeVenteController],
  providers: [PointDeVenteService]
})
export class PointDeVenteModule {}
