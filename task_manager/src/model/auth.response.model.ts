
export class AuthResponse {

    constructor(accessToken: string, userName: string, userId: number) {
        this.accessToken = accessToken;
        this.userName = userName;
        this.userId = userId;
    }
    
    accessToken: string;
    userName: string;
    userId: number;
    
}