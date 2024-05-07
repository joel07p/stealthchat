import { Room } from './room.entity';
import { Repository } from 'typeorm';
import { Group } from '../group/group.entity';
import { Permission } from '../permission/permission.entity';
import { CreateRoom, RenameRoom } from './types';
export declare class RoomService {
    private readonly roomRepository;
    private readonly groupRepository;
    private readonly permissionRepository;
    private logger;
    constructor(roomRepository: Repository<Room>, groupRepository: Repository<Group>, permissionRepository: Repository<Permission>);
    createRoom({ name, permissions, groupId }: CreateRoom): Promise<Room>;
    renameRoom({ roomId, newName }: RenameRoom): Promise<Room>;
    deleteRoom(roomId: string): Promise<import("typeorm").DeleteResult>;
    private setPermissionsToRoom;
    private checkIfPermissionsExist;
    private saveRoomToGroup;
}
