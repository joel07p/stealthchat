import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
export declare class AdminGuard implements CanActivate {
    private logger;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
