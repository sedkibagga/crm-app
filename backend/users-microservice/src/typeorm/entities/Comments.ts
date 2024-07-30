import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity({ name: "Comments" })
export class Comments {
    @PrimaryGeneratedColumn('uuid')
    id_comment: string; 

    @Column()
    comment: string;

    @Column()
    name: string;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: "user_id" })
    user: User;
}