import { IsString, IsUUID, Length } from "class-validator";
import { randomUUID } from "crypto";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Invitation } from "../invitation/invitation.entity";
import { Room } from "../room/room.entity";
import { GroupType } from "./group-type.enum";
import { UserOnGroups } from "./user-on-group.entity";

@Entity({ name: "groups" })
export class Group {
    constructor(name: string, description: string, type: string, joinCode: string) {
        this.id = randomUUID()
        this.name = name
        this.description = description
        this.type = type
        this.joinCode = joinCode
    }

    @PrimaryColumn({ type: "uuid", name: "id", unique: true, nullable: false })
    @IsUUID()
    readonly id: string

    @IsString()
    @Column({ type: "varchar", name: "name", unique: true, nullable: false })
    @Length(5, 50)
    name: string

    @IsString()
    @Column({ type: "varchar", name: "description" })
    @Length(0, 255)
    description: string

    @Column({ type: "varchar", name: "type", default: GroupType.MULTI })
    type: string

    @Column({ type: "varchar", name: "joinCode", unique: true, nullable: true })
    joinCode: string

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @OneToMany(() => Room, (room) => room.group, { cascade: true })
    rooms: Array<Room>

    @OneToMany(() => Invitation, (invitation) => invitation.group, { cascade: true })
    invitations: Array<Invitation>

    @OneToMany(() => UserOnGroups, userOnGroups => userOnGroups.user)
    userOnGroups: Array<UserOnGroups>;
}