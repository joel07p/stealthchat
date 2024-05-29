import { IsString, IsUUID, Length } from "class-validator";
import { randomUUID } from "crypto";
import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Room } from "../room/room.entity";

@Entity({ name: "permissions" })
export class Permission {
    constructor(name: string) {
        this.id = randomUUID()
        this.name = name
    }

    @PrimaryColumn({ type: "uuid", name: "uuid", unique: true, nullable: false })
    @IsUUID()
    readonly id: string

    @Column({ type: "varchar", name: "name", nullable: false })
    @IsString()
    @Length(0, 50)
    name: string

    @ManyToMany(() => Room, (room) => room.permissions)
    rooms: Array<Room>
}