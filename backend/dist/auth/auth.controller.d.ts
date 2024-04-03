import { AuthService } from './auth.service';
import { SignUpDTO } from './model';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(): void;
    signUp(credentials: SignUpDTO): void;
    logout(): void;
    refreshTokens(): void;
}
