import { IsNotEmpty, IsString } from "class-validator";

export class CreateEquipeDto{
    @IsString()
    @IsNotEmpty()
    secteur: string

    @IsString()
    @IsNotEmpty()
    lieu: string

    @IsString()
    @IsNotEmpty()
    nom: string

    @IsString()
    id_chefEquipe : string
}