"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMessageDTO = exports.UpdateMessageDTO = exports.AddMessageDTO = void 0;
const class_validator_1 = require("class-validator");
class AddMessageDTO {
}
exports.AddMessageDTO = AddMessageDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddMessageDTO.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddMessageDTO.prototype, "roomId", void 0);
class UpdateMessageDTO {
}
exports.UpdateMessageDTO = UpdateMessageDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateMessageDTO.prototype, "messageId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateMessageDTO.prototype, "roomId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateMessageDTO.prototype, "messageText", void 0);
class DeleteMessageDTO {
}
exports.DeleteMessageDTO = DeleteMessageDTO;
//# sourceMappingURL=dtos.js.map