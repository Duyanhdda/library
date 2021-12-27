import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "src/models/student.entity";
import { Turn } from "src/models/turn.entity";
import { Repository } from "typeorm";

@Injectable()
export class TurnService {
    constructor(
        @InjectRepository(Turn) private turnRepository: Repository<Turn>,
        @InjectRepository(Student) private studentRepository: Repository<Student>
    ) { }

    async getdata(): Promise<Turn[]> {
        return await this.turnRepository.find({
        });
    }
    async getAll(): Promise<Turn[]> {
        return await this.turnRepository.find({
            relations: ["student"],
        });
    }

    async getById(studentId: string): Promise<Turn> {
        return await this.turnRepository.findOne(studentId);
    }

    async getListTurn(studentId: string): Promise<Turn[]> {
        return await this.turnRepository.find({
            relations: ["student"],
            where: {
                student: { id: studentId },
            }
        });
    }

    async add(turn: Turn): Promise<void> {
        //console.log(student);
        await this.turnRepository.insert(turn);
    }
    async delete(student: Student): Promise<void> { //Delete Database has foreign key
        await this.turnRepository.delete({
            student: { id: student.id },
        });
    }

}
