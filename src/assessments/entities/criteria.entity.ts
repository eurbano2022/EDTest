import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    ManyToMany,
} from 'typeorm';

import { Activity } from './activity.entity';
import { Answer } from './answer.entity';
import { Goal } from './goal.entity';
import { ProcessArea } from './process-area.entity';
import { Resource } from './resource.entity';

@Entity()
export class Criteria {
    //key
    @PrimaryGeneratedColumn()
    id: number;

    //Attributes
    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'int' })
    weight: number;

    //Audit Attributes
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

    //Foreign keys
    @ManyToOne(() => ProcessArea, (processArea) => processArea.criteria)
    processArea: ProcessArea;

    @ManyToOne(() => Criteria, (criteria) => criteria.parent)
    parent: Criteria;

    //Keys into other tables
    @OneToMany(() => Activity, (activity) => activity.criteria)
    activity: Activity[];

    @OneToMany(() => Resource, (resource) => resource.criteria)
    resource: Resource[];

    @OneToMany(() => Answer, (answer) => answer.criteria)
    answer: Answer[];

    //Many to Many
    @ManyToMany(() => Goal, (goal) => goal.criterias)
    goals: Goal[];
}
