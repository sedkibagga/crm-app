import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Equipe } from "./Equipe";
import { Exclude } from "class-transformer";
import { RendezVous } from "./RendezVous";
import { Comments } from "./Comments";

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

    @OneToMany(() => Equipe, equipe => equipe.chefEquipe, {cascade:true, onDelete: "CASCADE"})
    equipes_chef?: Equipe[];

    @OneToMany(() => RendezVous, rendezVous => rendezVous.commercial, {cascade:true, onDelete: "CASCADE"})
    rendez_vous?: RendezVous[];

    @OneToMany(() => Comments , comments => comments.user, {cascade:true, onDelete: "CASCADE"})
    comments?: Comments[];
}
