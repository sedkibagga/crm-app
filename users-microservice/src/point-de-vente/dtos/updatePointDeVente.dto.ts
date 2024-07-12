// import { IsString, IsNumber, IsOptional } from "class-validator";

// export class UpdatePointDeVenteDto{
//     @IsString()
//     @IsOptional()
//     nom: string

//     @IsString()
//     @IsOptional()
//     prenom: string

//     @IsString()
//     @IsOptional()
//     secteur_activite: string

//     @IsNumber()
//     @IsOptional()
//     num_tel: number

//     @IsString()
//     @IsOptional()
//     localisation: string

//     @IsString()
//     @IsOptional()
//     decision: string
// }

import { PartialType } from '@nestjs/mapped-types';
import { PointDeVenteDto } from './pointDeVente.dto';

export class UpdatePointDeVenteDto extends PartialType(PointDeVenteDto) {}
