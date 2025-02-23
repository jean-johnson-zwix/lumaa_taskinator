import { UserEntity } from 'src/entity/user.entity';
import { DataSource } from 'typeorm';
import { User } from 'src/model/user.model';
import { AuthResponse } from 'src/model/auth.response.model';
export declare class AuthService {
    private dataSource;
    private userRepository;
    private logger;
    constructor(dataSource: DataSource);
    registerUser(user: User): Promise<UserEntity>;
    loginUser(user: User): Promise<AuthResponse>;
}
