import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';

import { Company } from './company.entity';
import { Criteria } from './criteria.entity';

@Entity()
export class Answer {
    //Key
    @PrimaryGeneratedColumn()
    id: number;

    //Attributes
    @Column({ type: 'varchar', length: 255, unique: true })
    result: boolean;

    @Column({ type: 'text' })
    email: string;

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
    @ManyToOne(() => Criteria, (criteria) => criteria.answer)
    criteria: Criteria;

    @ManyToOne(() => Company, (company) => company.answers)
    company: Company;
}
