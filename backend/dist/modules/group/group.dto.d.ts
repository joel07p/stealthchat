export declare class CreateGroupDTO {
    name: string;
    description: string;
    users: Array<string>;
}
export declare class JoinGroupDTO {
    joinCode: string;
}
export declare class LeaveGroupDTO {
    groupId: string;
}
