import { OneToOne } from "typeorm";
import { Message } from "../message/message.entity";

export class Attachment extends File {
   /* @OneToOne(() => Message, (message) => message.attachment)
    message: Message*/
}