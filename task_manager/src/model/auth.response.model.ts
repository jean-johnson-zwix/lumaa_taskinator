
export class AuthResponse {

    constructor(authStatus: string, userName: string, userId: number) {
        this.authStatus = authStatus;
        this.userName = userName;
        this.userId = userId;
    }
    
    authStatus: string;
    userName: string;
    userId: number;
    
}