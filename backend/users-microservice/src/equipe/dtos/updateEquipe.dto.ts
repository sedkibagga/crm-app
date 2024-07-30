import { PartialType } from "@nestjs/mapped-types";
import { CreateEquipeDto } from "./equipe.dto";

export class UpdateEquipeDto extends PartialType(CreateEquipeDto){}