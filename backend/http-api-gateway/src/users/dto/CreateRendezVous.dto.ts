import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRendezVousDto {
    @IsString()
    @IsNotEmpty()
    Nom_Prenom: string

    @IsNotEmpty()
    date: Date

    @IsString()
    @IsNotEmpty()
    localisation: string

    @IsNumber()
    @IsNotEmpty()
    num_tel: number

    @IsString()
    @IsNotEmpty()
    heure: string
}