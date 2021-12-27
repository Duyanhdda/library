import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "src/models/student.entity";
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>
    ) { }

    async getAll(): Promise<Student[]> {
        return await this.studentRepository.find();
    }

    async getOne(id: string): Promise<Student> {
        return await this.studentRepository.findOne(Number(id)); //Phải convert id sang number vì id của faculty là NUMBER chứ không phải là string
    }

    async getById(id: string): Promise<Student> {
        return await this.studentRepository.findOne(id);
    }

    async add(student: Student): Promise<void> {
        //console.log(student);
        await this.studentRepository.insert(student);
    }

    async edit(student: Student): Promise<void> {
        await this.studentRepository.update(student.id, student);
    }

    async delete(student: Student): Promise<void> {
        await this.studentRepository.delete(student.id);
    }

    //CurrentLibrary
    async getCurrent(): Promise<Student[]> {
        return await this.studentRepository.find({ currentStatus: true });
    }

    

}
