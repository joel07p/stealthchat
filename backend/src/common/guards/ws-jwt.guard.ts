import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { log } from "console";
import { Observable } from "rxjs";
import { Socket } from "socket.io";

@Injectable()
export class WebsocketJWTGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const socket: Socket = context.switchToWs().getClient()
        log("ws-guard")
        const token: string = socket.handshake.auth.authorization || socket.handshake.headers['authorization']
        log(socket.handshake.headers)

        const formattedToken = token.split(' ')[1]
        log(formattedToken)

        try {
            const payload = this.jwtService.verify(formattedToken)

            if(payload) return true
        } catch(error) {
            log(error)
            return false
        }

        
    }

}