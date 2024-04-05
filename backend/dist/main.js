"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors({
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST'],
    });
    const configService = app.get(config_1.ConfigService);
    const PORT = configService.get('PORT') || 3300;
    await app.listen(PORT);
    common_1.Logger.log("App listens on port: " + PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map