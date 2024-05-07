import { INestApplication, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server, ServerOptions } from "socket.io";
import { AuthService } from "src/auth/auth.service";
import { SocketWithAuth } from "./types";
import { log } from "console";

export class SocketIOAdapter extends IoAdapter {
    private readonly logger = new Logger(SocketIOAdapter.name)

    constructor(
        private app: INestApplication,
        private configService: ConfigService
    ) {
        super(app)
    }

    createIOServer(port: number, options?: ServerOptions) {
        const clientPort = parseInt(this.configService.get('CLIENT_PORT'));
    
        const cors = {
          origin: [
            `http://localhost:${3300}`,
            //new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${3300}$/`),
          ],
        };
    
        this.logger.log('Configuring SocketIO server with custom CORS options', {
          cors,
        });
    
        const optionsWithCORS: ServerOptions = {
          ...options,
          cors,
        };
    
        const authService = this.app.get(AuthService)
        const server: Server = super.createIOServer(port, optionsWithCORS)

        server.of('messages').use(createTokenMiddleware(authService, this.logger))

        return server
      }
}

const createTokenMiddleware =
  (authService: AuthService, logger: Logger) =>
  async (socket: SocketWithAuth, next) => {
    log(socket.handshake)
    const token =
      socket.handshake.auth.authorization || socket.handshake.headers['authorization'];

    logger.debug(`Validating auth token before connection: ${token}`);

    try {
      const userId = await authService.verifyToken(token)
      logger.log(userId)
      if(userId) {
        socket.userId = userId
        next();
      } else {
        next(new Error('FORBIDDEN'))
      }
    } catch {
      next(new Error('FORBIDDEN'));
    }
  };