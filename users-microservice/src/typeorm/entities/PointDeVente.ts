import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'pointDeVente'})
export class PointDeVente {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    nom: string

    @Column()
    prenom: string

    @Column()
    secteur_activite: string

    @Column()
    num_tel: number

    @Column()
    localisation: string

    @Column()
    decision: string
}