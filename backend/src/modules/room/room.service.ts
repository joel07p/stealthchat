import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { Repository } from 'typeorm';
import { Group } from '../group/group.entity';
import { Permission } from '../permission/permission.entity';
import { CreateRoom, GetRooms, RenameRoom } from './types';
import { UserService } from '../user/user.service';
import { log } from 'console';

@Injectable()
export class RoomService {
    private logger = new Logger(RoomService.name)

    constructor(
        @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
        @InjectRepository(Group) private readonly groupRepository: Repository<Group>,
        @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
        private readonly userService: UserService
    ) {}

    async getRoom(roomId: string) {
        return this.roomRepository.findOne({where: {id: roomId}, relations: ['permissions']})
    }

    async getRooms({groupId, userId}: GetRooms) {
        this.logger.log(`Trying to fetch groups for group ${groupId}`)

        const userPermission = await this.userService.getUserProperty(userId, "permission")

        const rooms = await this.roomRepository.createQueryBuilder("room")
            .leftJoin("room.permissions", "permission")
            .where("room.group.id = :groupId", { groupId })
            .andWhere("permission.name = :permission", { permission: userPermission })
            .getMany();

        return rooms
    }

    async createRoom({name, permissions, groupId}: CreateRoom) {
        this.logger.log(`Trying to create room with name: ${name}`)

        const roomInstance = new Room(name)
        const room = await this.roomRepository.save(roomInstance)

        await this.setPermissionsToRoom(permissions, roomInstance)
        await this.saveRoomToGroup(groupId, roomInstance)

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
        if(!roomToDelete) throw new NotFoundException(`Room with id ${roomId} not found`)

        return await this.roomRepository.delete(roomToDelete)
    }

    private async setPermissionsToRoom(permissionNames: Array<string>, room: Room) {
        this.logger.log("Trying to create permissions")

        for(const permissionName of permissionNames) {
            if(!await this.checkIfPermissionsExist(permissionName)) {
                this.logger.log(`Creating permission ${permissionName}`)
                const permission = new Permission(permissionName)
                const permissionFetched = await this.permissionRepository.save(permission)
                const fetchedRoom = await this.roomRepository.findOne({where: {id: room.id}, relations: ['permissions']})
                fetchedRoom.permissions.push(permissionFetched)
                
                await this.permissionRepository.save(permissionFetched)
                await this.roomRepository.save(fetchedRoom)
            } else {
                const roomFetched = await this.roomRepository.findOne({where: {id: room.id}, relations: ['permissions']})
                const permission = await this.permissionRepository.findOne({where: {name: permissionName}})
                
                log(roomFetched)

                if (permission) {
                    roomFetched.permissions.push(permission)
                    await this.permissionRepository.save(permission)
                    await this.roomRepository.save(roomFetched)
                }
            }
        }
    }

    private async checkIfPermissionsExist(permissionName: string) {
        this.logger.log("Check if permission exists")

        const permission = await this.permissionRepository.findOne({where: {name: permissionName}})

        if(permission) return true
        else return false
    }

    private async saveRoomToGroup(groupId: string, room: Room) {
        const group = await this.groupRepository.findOne({where: {id: groupId}})

        if(!group) throw new NotFoundException(`Group ${groupId} not found`)
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
