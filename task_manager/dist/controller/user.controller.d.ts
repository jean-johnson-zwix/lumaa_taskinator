import { User } from 'src/model/user.model';
import { UserService } from 'src/service/users.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    signIn(user: User): Promise<import("../model/auth.response.model").AuthResponse>;
    signUp(user: User): Promise<import("../entity/user.entity").UserEntity>;
}
