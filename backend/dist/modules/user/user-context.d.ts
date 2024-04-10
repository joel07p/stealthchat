import { User } from "./user.entity";
export declare class UserContext {
    private id;
    private username;
    private email;
    private identityCode;
    private accessCode;
    private isAuthenticated;
    generateIdentityCode(): string;
    setUser(user: User): void;
    getId(): string;
    getUsername(): string;
    getEmail(): string;
    getIdentityCode(): string;
    setIdentityCode(value: string): void;
    getAccessCode(): string;
    setAccessCode(accessCode: string): void;
    getIsAuthenticated(): boolean;
    setIsAuthenticated(value: boolean): void;
}
