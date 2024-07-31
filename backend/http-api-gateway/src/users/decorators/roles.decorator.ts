import { SetMetadata } from "@nestjs/common";
import { RolesEnum } from "../Roles/Roles.enum";
export const Roles_Key = 'roles';

export const Roles = (...roles: RolesEnum[]) => SetMetadata(Roles_Key, roles)