import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({name: 'rendezVous'})
export class RendezVous {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    Nom_Prenom: string

    @Column()
    date: Date

    @Column()
    localisation: string

    @Column()
    num_tel: number

    @Column()
    heure: string

    @Column({default: 'not_done'})
    statut?: string

    @ManyToOne(() => User, user => user.rendez_vous, {onDelete: "CASCADE"})
    @JoinColumn({ name: 'id_commercial' })
    commercial: User;
}