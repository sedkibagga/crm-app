import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRendezVousDto {
    @IsString()
    @IsNotEmpty()
    Nom_Prenom: string
    
    @Type(() => Date)
    date: Date;

    @IsString()
    @IsNotEmpty()
    localisation: string

    @IsNumber()
    @IsNotEmpty()
    num_tel: number

    @IsString()
    @IsNotEmpty()
    heure: string

    @IsString()
    @IsOptional()
    statut: string

    @IsString()
    @IsNotEmpty()
    commercial: string
}