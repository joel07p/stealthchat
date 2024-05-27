import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class AddMessageDTO {
    @IsString()
    message: string

    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsUUID()
    roomId: string

    attachment: any
}

export class DeleteMessageDTO {
    messageId: string
    roomId: string
}