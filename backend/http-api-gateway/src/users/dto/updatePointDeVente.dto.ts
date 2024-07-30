import { PartialType } from '@nestjs/mapped-types';
import { PointDeVenteDto } from './pointDeVente.dto';

export class UpdatePointDeVenteDto extends PartialType(PointDeVenteDto) {}