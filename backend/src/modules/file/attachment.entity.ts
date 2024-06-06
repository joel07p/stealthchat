import { Column, OneToOne } from "typeorm";
import { Message } from "../message/message.entity";
import { IsString } from "class-validator";

export class Attachment {
   /*@OneToOne(() => Message, (message) => message.attachment)
    message: Message

    @Column({ type: "varchar", name: "message", nullable: false })
    @IsString()
    type: string*/
}