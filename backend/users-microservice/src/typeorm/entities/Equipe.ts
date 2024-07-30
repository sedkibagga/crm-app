import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { MembreEquipe } from "./MembreEquipe";

@Entity({ name: "equipe" })
export class Equipe {
    @PrimaryGeneratedColumn('uuid')
    id_equipe: string;

    @Column()
    secteur: string;

    @Column()
    lieu: string;

    @Column()
    nom: string;

    @ManyToOne(() => User, user => user.equipes_chef, {onDelete: "CASCADE"})
    @JoinColumn({ name: 'id_chefEquipe' })
    chefEquipe?: User;

    @OneToMany(() => MembreEquipe, membre => membre.equipe, {cascade:true, onDelete: 'CASCADE'})
    membres: User[];
}
