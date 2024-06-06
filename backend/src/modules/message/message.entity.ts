import { IsString, IsUUID, Length } from "class-validator";
import { randomUUID } from "crypto";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Attachment } from "../file/attachment.entity";
import { Room } from "../room/room.entity";

@Entity({ name: "messages" })
export class Message {
    constructor(message: string, username: string, attachment?: Attachment) {
        this.id = randomUUID()
        this.message = message
        this.username = username
        //this.attachment = attachment
        this.sentAt = new Date()
    }

    @PrimaryColumn({ type: "uuid", name: "id", unique: true, nullable: false })
    @IsUUID()
    readonly id: string

    @Column({ type: "varchar", name: "message" })
    @IsString()
    @Length(0, 255)
    message: string

    @Column({ type: "varchar", name: "username", nullable: false })
    @IsString()
    @Length(5, 50)
    username: string

    @CreateDateColumn({ type: 'timestamp'})
    sentAt: Date;

    /*@OneToOne(() => Attachment)
    @JoinColumn()
    attachment: Attachment*/

    @ManyToOne(() => Room, (room) => room.messages)
    room: Room
}