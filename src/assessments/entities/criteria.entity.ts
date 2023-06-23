import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';

import { Activity } from './activity.entity';
import { ProcessArea } from './process-area.entity';
import { Resource } from './resource.entity';

@Entity()
export class Criteria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'int' })
    weight: number;

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

    @ManyToOne(() => ProcessArea, (processArea) => processArea.criteria)
    processArea: ProcessArea;

    @OneToMany(() => Activity, (activity) => activity.criteria)
    activity: Activity[];

    @OneToMany(() => Resource, (resource) => resource.criteria)
    resource: Resource[];

    @ManyToOne(() => Criteria, (criteria) => criteria.parent)
    parent: Criteria;
}
