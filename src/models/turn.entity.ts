import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./student.entity";

@Entity()
export class Turn {
    @PrimaryColumn(({length: 100 }))
    id: string;

    /** 
     * turnInOut = 1 => In
     * turnInOut = 0 => Out
     */
    @Column()
    turnInOut: boolean;

    @CreateDateColumn()
    createAt: Date;

    @ManyToOne(() => Student )
    @JoinTable()
    student: Student;
}
