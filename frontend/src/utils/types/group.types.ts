export type CreateGroupData = {
    name: string
    description: string
    users: Array<string>
}

export type LeaveGroupData = {
    groupId: string
}

export type JoinGroupData = {
    joinCode: string
}