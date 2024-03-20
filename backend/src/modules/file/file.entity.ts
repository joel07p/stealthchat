import { IsUUID } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "files" })
export class File {
    @PrimaryColumn({ type: 'uuid', name: "id", unique: true, nullable: false })
    @IsUUID()
    readonly id: string;

    @Column({ type: "varchar", name: "path", nullable: false })
    path: string

    @Column({ type: "number", name: "size" })
    size: string

    @Column({ type: "varchar", name: "type" })
    type: string
    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}