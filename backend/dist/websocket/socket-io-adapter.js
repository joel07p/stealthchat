"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIOAdapter = void 0;
const common_1 = require("@nestjs/common");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const auth_service_1 = require("../auth/auth.service");
const console_1 = require("console");
const room_service_1 = require("../modules/room/room.service");
class SocketIOAdapter extends platform_socket_io_1.IoAdapter {
    constructor(app, configService) {
        super(app);
        this.app = app;
        this.configService = configService;
        this.logger = new common_1.Logger(SocketIOAdapter.name);
    }
    createIOServer(port, options) {
        const clientPort = parseInt(this.configService.get('CLIENT_PORT'));
        const cors = {
            origin: [
                `http://localhost:${3300}`,
            ],
        };
        this.logger.log('Configuring SocketIO server with custom CORS options', {
            cors,
        });
        const optionsWithCORS = {
            ...options,
            cors,
        };
        const authService = this.app.get(auth_service_1.AuthService);
        const roomService = this.app.get(room_service_1.RoomService);
        const server = super.createIOServer(port, optionsWithCORS);
        server.of('messages').use(createTokenMiddleware(authService, this.logger)).use(createSocketValidationMiddleware(roomService, this.logger));
        return server;
    }
}
exports.SocketIOAdapter = SocketIOAdapter;
const createTokenMiddleware = (authService, logger) => async (socket, next) => {
    (0, console_1.log)(socket.handshake);
    const token = socket.handshake.auth.authorization || socket.handshake.auth.Authorization || socket.handshake.headers['authorization'];
    logger.debug(`Validating auth token before connection: ${token}`);
    try {
        const userId = await authService.verifyToken(token);
        logger.log(userId);
        if (userId) {
            socket.userId = userId;
            next();
        }
        else {
            next(new Error('FORBIDDEN'));
        }
    }
    catch {
        next(new Error('FORBIDDEN'));
    }
};
const createEncryptionMiddleware = () => { };
const createSocketValidationMiddleware = (roomService, logger) => async (client, next) => {
    logger.log(`Trying to validate client ${client.id}`);
    const roomId = client.handshake.query.roomId.toString();
    const room = await roomService.getRoom(roomId);
    (0, console_1.log)(room);
    if (room === null)
        next(new Error('FORBIDDEN'));
    next();
};
//# sourceMappingURL=socket-io-adapter.js.map