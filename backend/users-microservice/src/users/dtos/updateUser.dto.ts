import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./userDto";

export class UpdateUserDto extends PartialType(CreateUserDto){}