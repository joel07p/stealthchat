import { User } from "src/user/user.entity";
export declare class Authentication {
    constructor();
    readonly id: string;
    private hash;
    private refreshToken;
    private identityCode;
    user: User;
    setHash(hash: string): this;
    setRefreshToken(refreshToken: string): this;
    setIdentityCode(identityCode: string): this;
    getHash(): string;
    getRefreshToken(): string;
    getIdentityCode(): string;
}
