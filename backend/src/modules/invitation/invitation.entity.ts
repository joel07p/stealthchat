import { IsString, IsUUID, Length } from "class-validator";
import { randomUUID } from "crypto";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Group } from "../group/group.entity";

@Entity({ name: "invitations" })
export class Invitation {
    constructor(message: string, identityCode: string, joinCode: string, expiresAt: Date) {
        this.id = randomUUID()
        this.message = message
        this.identityCode = identityCode
        this.joinCode = joinCode
        this.expiresAt = expiresAt
    }

    @PrimaryColumn({ type: "uuid", name: "id", unique: true, nullable: false })
    @IsUUID()
    readonly id: string

    @Column({ type: "varchar", name: "message" })
    @IsString()
    @Length(0, 255)
    message: string

    @Column({ type: "varchar", name: "identityCode", unique: true, nullable: false })
    @IsString()
    identityCode: string

    @Column({ type: "varchar", name: "accessCode", unique: true, nullable: false })
    @IsString()
    joinCode: string

    @CreateDateColumn({ type: 'timestamp', name: "sentAt" })
    sentAt: Date;

    @Column({ type: "timestamp", name: "expiresAt", nullable: false })
    expiresAt: Date

    @ManyToOne(() => Group, (group) => group.invitations)
    group: Group
}