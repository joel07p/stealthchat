export class CreateGroupDTO {
    name: string
    description: string
    users: Array<string>
}

export class JoinGroupDTO {
    joinCode: string
}

export class LeaveGroupDTO {
    groupId: string
}