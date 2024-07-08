import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    nom: string;
    @IsString()
    @IsNotEmpty()
    prenom: string;
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsString()
    @IsOptional()
    role: string;
    @IsNumber()
    @IsNotEmpty()
    num_tel : number;
} 

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
}