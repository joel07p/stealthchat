<<<<<<< HEAD
import { User } from "src/modules/user/user.entity";
=======
import { User } from "src/user/user.entity";
>>>>>>> 822aca9d10b7325e68f388c3c26962881af91ccf
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
