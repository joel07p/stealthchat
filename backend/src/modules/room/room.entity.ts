import { IsString, IsUUID, Length } from "class-validator";
import { randomUUID } from "crypto";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Message } from "../message/message.entity";
import { Permission } from "../permission/permission.entity";
import { Group } from "../group/group.entity";

@Entity({ name: "rooms" })
export class Room {
    constructor(name: string) {
        this.id = randomUUID()
        this.name = name
    }

    @PrimaryColumn({ type: "uuid", name: "uuid", unique: true, nullable: false })
    @IsUUID()
    readonly id: string

    @Column({ type: "varchar", name: "name" })
    @IsString()
    @Length(0, 50)
    name: string

    @OneToMany(() => Message, (message) => message.room, { cascade: true })
    messages: Array<Message>    

    @OneToMany(() => Permission, (permission) => permission.room)
    permissions: Array<Permission>

    @ManyToOne(() => Group, (group) => group.rooms)
    group: Group
}