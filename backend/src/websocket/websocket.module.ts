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

@Module({
    imports: [
        TypeOrmModule.forFeature([Message, User, Group, UserOnGroups]),
        GroupModule
    ],
    providers: [MessageGateway, MessageService, JwtService],
    exports: []
})
export class WebSocketModule {}