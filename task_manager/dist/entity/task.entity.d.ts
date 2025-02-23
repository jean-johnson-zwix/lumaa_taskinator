import { UserEntity } from './user.entity';
export declare class TaskEntity {
    id: number;
    title: string;
    description: string;
    isComplete: boolean;
    user: UserEntity;
}
