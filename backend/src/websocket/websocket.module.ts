import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "src/modules/group/group.entity";
import { GroupModule } from "src/modules/group/group.module";
import { UserOnGroups } from "src/modules/group/user-on-group.entity";
import { Message } from "src/modules/message/message.entity";
import { MessageService } from "src/modules/message/message.service";
import { User } from "src/modules/user/user.entity";
import { MessageGateway } from "./message.gateway";
import { Room } from "src/modules/room/room.entity";
import { UserService } from "src/modules/user/user.service";
import { Authentication } from "src/auth/authentication.entity";
import { RoomService } from "src/modules/room/room.service";
import { Permission } from "src/modules/permission/permission.entity";
import { EncryptionService } from "src/service/encryption.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Message, User, Group, UserOnGroups, Room, Authentication, Permission]),
        GroupModule
    ],
    providers: [MessageGateway, MessageService, JwtService, UserService, RoomService, EncryptionService],
    exports: []
})
export class WebSocketModule {}