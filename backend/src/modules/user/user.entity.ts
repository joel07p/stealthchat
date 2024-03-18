import { IsEmail, IsString, IsUUID, Length } from 'class-validator';
import { randomUUID } from 'crypto';
import { Authentication } from 'src/auth/authentication.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
    constructor(username: string, email: string, authentication: Authentication) {
        this.id = randomUUID()
        this.username = username
        this.email = email
        this.authentication = authentication
    }

    @PrimaryColumn({ type: 'uuid', name: "id", unique: true, nullable: false })
    @IsUUID()
    readonly id: string;

    @Column({ type: 'varchar', name: "username", unique: true, nullable: false })
    @IsString()
    @Length(5, 50)
    username: string;

    @Column({ type: 'varchar', name: "email", unique: true, nullable: false })
    @IsEmail()
    email: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToOne(() => Authentication)
    @JoinColumn()
    authentication: Authentication
}
