import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('t_task')
export class TaskEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    
    @Column({ nullable: true })
    description: string;

    @Column({default: false})
    isComplete: boolean;

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn({name: 'userId'})
    user: UserEntity;

}