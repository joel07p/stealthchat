import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";

@Injectable()
export class UserContext {
    private id: string
    private username: string
    private email: string
    private identityCode: string
    private accessCode: Array<number>
    private isAuthenticated: boolean
    private otpEnabled: boolean

    generateIdentityCode(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        const identityCodeLength = 10
        let identityCode = '#'
    
        for (let index = 0; index < (identityCodeLength - 1); index++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            identityCode += characters[randomIndex];
        }

        this.setIdentityCode(identityCode);
    
        return identityCode;
    }

    setUser(user: User) {
        this.id = user.id
        this.username = user.username
        this.email = user.email
    }

    getId(): string {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getEmail(): string {
        return this.email;
    }

    getIdentityCode(): string {
        return this.identityCode;
    }

    setIdentityCode(value: string): void {
        this.identityCode = value;
    }

    getAccessCode(): Array<number> {
        return this.accessCode
    }

    setAccessCode(accessCode: Array<number>): void {
        this.accessCode = accessCode
    }

    getIsAuthenticated(): boolean {
        return this.isAuthenticated;
    }

    setIsAuthenticated(value: boolean): void {
        this.isAuthenticated = value;
    }
}