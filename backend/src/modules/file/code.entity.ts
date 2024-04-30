import { Entity } from "typeorm";
import { Attachment } from "./attachment.entity";

@Entity({ name: "codes" })
export class Code extends Attachment {}