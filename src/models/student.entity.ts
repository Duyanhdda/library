import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Turn } from './turn.entity';

@Entity()
export class Student {
  @PrimaryColumn({length: 100 })
  id: string;

  @Column({ nullable: false ,length: 100})
  firstName: string;

  @Column({ nullable: false , length: 100 })
  lastName: string;

  @Column({length: 100 , unique: true })
  email: string;
  
  @Column()
  countInOut: number;

  @Column()
  currentStatus: boolean;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
