import { IsArray, IsNotEmpty, IsString } from "class-validator"

export class CreateRoomDTO {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsArray()
    @IsNotEmpty()
    permissions: Array<string>

    @IsString()
    @IsNotEmpty()
    groupId: string
}

export class RenameRoomDTO {
    @IsString()
    @IsNotEmpty()
    roomId: string

    @IsString()
    @IsNotEmpty()
    newName: string
}