import { User } from 'src/model/user.model';
import { AuthService } from 'src/service/auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(user: User): Promise<import("../model/auth.response.model").AuthResponse>;
    register(user: User): Promise<{
        id: any;
        userName: any;
    }>;
}
