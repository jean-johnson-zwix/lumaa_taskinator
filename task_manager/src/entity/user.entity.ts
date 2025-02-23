import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('t_user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    userName: string;
    
    @Column({ nullable: true })
    password: string;

}