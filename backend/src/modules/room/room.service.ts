import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { Repository } from 'typeorm';
import { Group } from '../group/group.entity';
import { Permission } from '../permission/permission.entity';
import { CreateRoom, RenameRoom } from './types';

@Injectable()
export class RoomService {
    private logger = new Logger(RoomService.name)

    constructor(
        @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
        @InjectRepository(Group) private readonly groupRepository: Repository<Group>,
        @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>
    ) {}

    async createRoom({name, permissions, groupId}: CreateRoom) {
        this.logger.log(`Trying to create room with name: ${name}`)

        const roomInstance = new Room(name)
        const room = await this.roomRepository.save(roomInstance)

        this.setPermissionsToRoom(permissions, roomInstance)
        this.saveRoomToGroup(groupId, roomInstance)

        return room
    }

    async renameRoom({roomId, newName}: RenameRoom) {
        this.logger.log(`Trying to rename room with id: ${roomId} to ${newName}`)

        const room = await this.roomRepository.findOne({where: {id: roomId}})

        if(!room) throw new NotFoundException(`Room with id ${roomId} not found`)
        room.name = newName

        return await this.roomRepository.save(room)
    }

    async deleteRoom(roomId: string) {
        this.logger.log(`Trying to delet room with id: ${roomId}`)

        const roomToDelete = await this.roomRepository.findOne({where: {id: roomId}})

        return await this.roomRepository.delete(roomToDelete)
    }

    private setPermissionsToRoom(permissionNames: Array<string>, room: Room) {
        this.logger.log("Trying to create permissions")

        permissionNames.forEach(async (permissionName: string) => {
            if(!await this.checkIfPermissionsExist(permissionName)) {
                const permission = new Permission(permissionName)
                permission.room = room
                await this.permissionRepository.save(permission)    
            }
        })
    }

    private async checkIfPermissionsExist(permissionName: string) {
        this.logger.log("Check if permission exists")

        const permission = await this.permissionRepository.findOne({where: {name: permissionName}})

        if(permission) return true
        else return false
    }

    private async saveRoomToGroup(groupId: string, room: Room) {
        const group = await this.groupRepository.findOne({where: {id: groupId}})

        if(!group) return
        room.group = group

        await this.roomRepository.save(room)
    }

    /*
    private async checkIfRoomExistsInGgroup(groupId: string, room: Room) {
        const { rooms } = await this.groupRepository.findOne({
            where: {
                id: groupId
            },
            relations: ['rooms']
        })

        rooms.forEach(())
    }*/
}
