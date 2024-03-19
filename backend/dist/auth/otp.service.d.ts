import { UserContext } from "src/modules/user/user-context";
export declare class OTPService {
    private userContext;
    private readonly lenght;
    constructor(userContext: UserContext);
    generateOTP(): Array<number>;
    sendOTP(): void;
    checkOTP(accessCode: Array<number>): boolean;
}
