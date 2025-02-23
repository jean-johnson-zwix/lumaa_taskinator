import { UserEntity } from 'src/entity/user.entity';
import { DataSource } from 'typeorm';
import { User } from 'src/model/user.model';
import { AuthResponse } from 'src/model/auth.response.model';
export declare class UserService {
    private dataSource;
    private userRepository;
    private logger;
    constructor(dataSource: DataSource);
    createUser(user: User): Promise<UserEntity>;
    verifyUser(user: User): Promise<AuthResponse>;
}
