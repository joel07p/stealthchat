import { CanActivate, ExecutionContext, Logger } from "@nestjs/common";
import { Observable } from "rxjs";

export class AdminGuard implements CanActivate {
    private logger = new Logger(AdminGuard.name)

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        throw new Error("Method not implemented.");
    }

}