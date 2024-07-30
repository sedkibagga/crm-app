import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    password: string;

    @Column()
    role: string; 

    @Column()
    num_tel : number
}