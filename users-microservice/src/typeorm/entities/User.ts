import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Equipe } from "./Equipe";
import { Exclude } from "class-transformer";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ default: 'user' })
    role?: string;

    @Column()
    num_tel: number;

    @OneToMany(() => Equipe, equipe => equipe.chefEquipe)
    equipes_chef?: Equipe[];
}
