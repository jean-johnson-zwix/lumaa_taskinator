import { DataSource } from 'typeorm';
import { User } from 'src/model/user.model';
import { AuthResponse } from 'src/model/auth.response.model';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private dataSource;
    private jwtService;
    private userRepository;
    private logger;
    constructor(dataSource: DataSource, jwtService: JwtService);
    authenticate(authHeader: string): any;
    registerUser(user: User): Promise<{
        id: any;
        userName: any;
    }>;
    loginUser(user: User): Promise<AuthResponse>;
}
