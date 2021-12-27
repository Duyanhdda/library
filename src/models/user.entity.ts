import { UserRole, UserStatus } from "src/constants/user.constant";
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn({length: 100})
    email: string;

    @Column({ nullable: false ,length: 100})
    password: string;

    //Roles 
    @Column({ default: UserStatus.UNINITIALZED })
    init: number;

    @Column({ default: UserRole.STUDENT })
    role: number;
    //End Roles
    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}
  