<<<<<<< HEAD
import { AuthService } from './auth.service';
import { SignUpDTO } from './model';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(): void;
    signUp(credentials: SignUpDTO): void;
    logout(): void;
    refreshTokens(): void;
=======
export declare class AuthController {
>>>>>>> 822aca9d10b7325e68f388c3c26962881af91ccf
}
