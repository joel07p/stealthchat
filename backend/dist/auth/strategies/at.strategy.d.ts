import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
declare const AtStrategy_base: new (...args: any[]) => Strategy;
export declare class AtStrategy extends AtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: any): any;
}
export {};
