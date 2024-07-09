import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

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

    @ManyToOne(() => User, user => user.equipes_chef)
    @JoinColumn({ name: 'id_chefEquipe' })
    chefEquipe?: User;
}
