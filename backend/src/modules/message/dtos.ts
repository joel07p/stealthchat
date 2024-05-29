import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class AddMessageDTO {
    @IsString()
    message: string

    @IsString()
    @IsUUID()
    @IsNotEmpty()
    roomId: string

    attachment: any
}

export class DeleteMessageDTO {
    messageId: string
    roomId: string
}