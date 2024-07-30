import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class PointDeVenteDto{
    @IsString()
    @IsNotEmpty()
    nom: string

    @IsString()
    @IsNotEmpty()
    prenom: string

    @IsString()
    @IsNotEmpty()
    secteur_activite: string

    @IsNumber()
    @IsNotEmpty()
    num_tel: number

    @IsString()
    @IsNotEmpty()
    localisation: string

    @IsString()
    @IsNotEmpty()
    decision: string
}