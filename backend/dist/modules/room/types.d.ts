export type GetRooms = {
    groupId: string;
    userId: string;
};
export type CreateRoom = {
    name: string;
    permissions: Array<string>;
    groupId: string;
};
export type RenameRoom = {
    roomId: string;
    newName: string;
};
