import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class commentsDto {
    @IsNotEmpty()
    @IsString()
    comment: string;

    @IsNotEmpty()
    @IsString()
    name: string;
}


export class updateCommentDto {
    @IsOptional()
    @IsString()
    comment: string
    
}