import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

import { ProcessArea } from './process-area.entity';

@Entity()
export class Level {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @CreateDateColumn({
        type: 'timestamp',
        precision: 0,
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        precision: 0,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @OneToMany(() => ProcessArea, (product) => product.level)
    processAreas: ProcessArea[];
}
