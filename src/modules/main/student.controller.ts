import { RoleGuard } from 'src/guards/roles.guard';
import { StudentService } from 'src/services/student.service';
import { Body, Controller, Get, Post, Render, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { Student } from 'src/models/student.entity';
import { TurnService } from 'src/services/turn.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import * as Excel from "exceljs";
import { unlinkSync } from 'fs';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/constants/user.constant';
@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService, private turnService: TurnService) { }
    @Get()
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Render('student/index')
    async index(@Req() req: Request) {
        var studentList = await this.studentService.getAll();
        //console.log(studentList);
        return {
            studentList: studentList,
        }
    }

    @Post("/checkId")
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    async checkId(@Body('id') id: string) {
        let student = await this.studentService.getById(id);
        if (!student) return {
            status: "NOT_FOUND"
        }
        return {
            status: "FOUND"
        }
    }


    @Post("/add")
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    async add(@Res() res: Response, @Body() student: any) {
        var studentToAdd: Student = new Student();
        studentToAdd.id = student.id;
        studentToAdd.lastName = student.lastName;
        studentToAdd.firstName = student.firstName;
        studentToAdd.email = student.email;
        //console.log(student);
        //console.log(studentToAdd);
        await this.studentService.add(studentToAdd);
        res.redirect("/student");
    }

    @Post("/edit")
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    async edit(@Res() res: Response, @Body() student: any) {
        var studentToEdit: Student = new Student();
        studentToEdit.id = student.id;
        studentToEdit.lastName = student.lastName;
        studentToEdit.firstName = student.firstName;
        studentToEdit.email = student.email;
        //console.log(studentToEdit);
        await this.studentService.edit(studentToEdit);
        res.redirect("/student");
    }

    @Post("/delete")
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    async delete(@Res() res: Response, @Body() student: any) {
        await this.turnService.delete(student); //Firstly delete turnserice, secondly delete studentservice
        await this.studentService.delete(student);
        res.redirect("/student");
    }

    @Post("/deleteAll")
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    async deleteAll(@Res() res: Response) {
        let studentList = await this.studentService.getAll();
        //console.log(studentList);
        //await this.turnService.delete(studentList[1]);
        for (let student of studentList) {
            await this.turnService.delete(student);
            await this.studentService.delete(student);
        }
        res.redirect("/student");
    }

    @Post("upload")
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @UseInterceptors(
        FileInterceptor("sampleFile", {
            storage: diskStorage({
                destination: "./public/upload",
                filename: (req, file, cb) => {
                    const [basename, extname] = file.originalname.split(".");
                    cb(
                        null,
                        `${basename}-${Date.now()}.${extname}`
                    );
                },
            }),
        })
    )
    async uploadProcess(
        @UploadedFile() file: Express.Multer.File,
        @Res() res: Response
    ) {
        //console.log(file);
        const workbook = new Excel.Workbook();
        const worksheet = await workbook.csv.readFile(file.path);
        //console.log(worksheet.rowCount);
        //console.log(worksheet.columnCount);
        for (let i = 2; i <= worksheet.rowCount; i++) {
            const dataRow = worksheet.getRow(i).values;
            var studentToAdd: Student = new Student();
            studentToAdd.id = dataRow[1];
            studentToAdd.firstName = dataRow[2];
            studentToAdd.lastName = dataRow[3];
            studentToAdd.email = dataRow[4];
            var check = await this.checkId(studentToAdd.id.toString());
            //console.log(check.status);
            if (check.status != "FOUND")
                await this.studentService.add(studentToAdd);
            console.log(studentToAdd);
        }
        unlinkSync(file.path);
        return res.redirect("/student");
    }

}
