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

export class UpdateMessageDTO {
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    messageId: string

    @IsString()
    @IsUUID()
    @IsNotEmpty()
    roomId: string

    @IsString()
    @IsNotEmpty()
    messageText: string
}

export class DeleteMessageDTO {
    messageId: string
    roomId: string
}