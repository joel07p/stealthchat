import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
type JwtPayload = {
    sub: string;
    email: string;
};
declare const AtStrategy_base: new (...args: any[]) => Strategy;
export declare class AtStrategy extends AtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: JwtPayload): JwtPayload;
}
export {};
