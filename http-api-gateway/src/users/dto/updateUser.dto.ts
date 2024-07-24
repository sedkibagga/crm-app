import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./User.dto";

export class UpdateUserDto extends PartialType(CreateUserDto){}