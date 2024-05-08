"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuard = void 0;
const common_1 = require("@nestjs/common");
class AdminGuard {
    constructor() {
        this.logger = new common_1.Logger(AdminGuard.name);
    }
    canActivate(context) {
        throw new Error("Method not implemented.");
    }
}
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=admin.guard.js.map