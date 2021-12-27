import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    Generated,
  } from 'typeorm';



@Entity()
export class Map {
    @PrimaryColumn({length: 100 }) 
    id: string;

    @Column()
    state: boolean;

}