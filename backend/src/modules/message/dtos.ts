import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class AddMessage {
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