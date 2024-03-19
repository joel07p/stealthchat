import { IsString, IsUUID, Max, Min } from "class-validator";
import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { randomUUID } from "crypto";
import { User } from "src/modules/user/user.entity";

@Entity({ name: "authentications" })
export class Authentication {
    constructor() {
        this.id = randomUUID()
    }

    @PrimaryColumn({ type: "uuid", name: "id", unique: true, nullable: false })
    @IsUUID()
    readonly id: string

    @Column({ type: "varchar", name: "hash", nullable: false })
    @IsString()
    private hash: string

    @Column({ type: "varchar", name: "refreshToken" })
    @IsString()
    @Min(50)
    private refreshToken: string

    @Column({ type: "varchar", name: "identityCode" })
    @IsString()
    @Max(20)
    private identityCode: string
    //like discord, to identity the user

    @OneToOne(() => User, (user) => user.authentication)
    user: User

    setHash(hash: string) {
        this.hash = hash
        return this
    }

    setRefreshToken(refreshToken: string) {
        this.refreshToken = refreshToken
        return this
    }

    setIdentityCode(identityCode: string) {
        this.identityCode = identityCode
        return this
    }

    getHash() {
        return this.hash;
    }

    getRefreshToken() {
        return this.refreshToken;
    }

    getIdentityCode() {
        return this.identityCode;
    }
}