import { Group } from "../group/group.entity";
export declare class Invitation {
    constructor(message: string, identityCode: string, joinCode: string, expiresAt: Date);
    readonly id: string;
    message: string;
    identityCode: string;
    joinCode: string;
    sentAt: Date;
    expiresAt: Date;
    group: Group;
}
