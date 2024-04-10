import { IsString, IsUUID, Length } from "class-validator";
import { randomUUID } from "crypto";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Room } from "../room/room.entity";

@Entity({ name: "messages" })
export class Message {
    constructor(message: string, username: string, content?: any) {
        this.id = randomUUID()
        this.message = message
        this.username = username
        this.content = content
        this.sentAt = new Date()
    }

    @PrimaryColumn({ type: "uuid", name: "id", unique: true, nullable: false })
    @IsUUID()
    readonly id: string

    @Column({ type: "varchar", name: "message" })
    @IsString()
    @Length(0, 255)
    message: string

    @Column({ type: "varchar", name: "content" })
    content: any

    @Column({ type: "varchar", name: "username", unique: true, nullable: false })
    @IsString()
    @Length(5, 50)
    username: string

    @CreateDateColumn({ type: 'timestamp'})
    sentAt: Date;

    @ManyToOne(() => Room, (room) => room.messages)
    room: Room
}