import { User } from "src/modules/user/user.entity";
export declare class Authentication {
    constructor();
    readonly id: string;
    private hash;
    private refreshToken;
    identityCode: string;
    user: User;
    setHash(hash: string): this;
    setRefreshToken(refreshToken: string): this;
    setIdentityCode(identityCode: string): this;
    getHash(): string;
    getRefreshToken(): string;
    getIdentityCode(): string;
}
