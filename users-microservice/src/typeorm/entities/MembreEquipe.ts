import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Equipe } from "./Equipe";

@Entity({name: 'membre_equipe'})
export class MembreEquipe{
    @PrimaryGeneratedColumn('uuid')
    id: string

    // @PrimaryColumn()
    // id_membre: string;

    // @PrimaryColumn()
    // id_equipe: string

    @ManyToOne(() => User, user => user.id, {onDelete: "CASCADE"})
    @JoinColumn({ name: 'id_membre' })
    membre: User;

    @ManyToOne(() => Equipe, equipe => equipe.id_equipe, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'id_equipe' })
    equipe: Equipe;
}