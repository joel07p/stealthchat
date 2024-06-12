"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const socket_io_adapter_1 = require("./websocket/socket-io-adapter");
const bootstrap = async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors({});
    app.setGlobalPrefix('api');
    const configService = app.get(config_1.ConfigService);
    const PORT = configService.get('PORT') || 3300;
    app.useWebSocketAdapter(new socket_io_adapter_1.SocketIOAdapter(app, configService));
    await app.listen(PORT);
    common_1.Logger.log("App listens on port: " + PORT);
};
bootstrap();
//# sourceMappingURL=main.js.map