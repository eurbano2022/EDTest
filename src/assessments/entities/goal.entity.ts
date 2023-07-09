import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
} from 'typeorm';

import { Criteria } from './criteria.entity';
import { Practice } from './practice.entity';

@Entity()
export class Goal {
    //key
    @PrimaryGeneratedColumn()
    id: number;

    //Attributes
    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'text' })
    type: string;

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

    //Keys into external Tables
    @OneToMany(() => Practice, (practice) => practice.goal)
    practices: Practice[];

    //Many to Many
    @ManyToMany(() => Criteria, (criteria) => criteria.goals)
    @JoinTable()
    criterias: Criteria[];
}
