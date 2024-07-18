import { PartialType } from '@nestjs/mapped-types';
import { CreateRendezVousDto } from './CreateRendezVous.dto';

export class UpdateRendezVousDto extends PartialType(CreateRendezVousDto) {}