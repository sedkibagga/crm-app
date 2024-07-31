import { IsNotEmpty, IsString } from "class-validator";

export class AjouterMembreDto{
    @IsString()
    @IsNotEmpty()
    id_membre: string
    
    @IsString()
    @IsNotEmpty()
    id_equipe: string
}