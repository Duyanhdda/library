import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Get, Post, Render, UseGuards } from '@nestjs/common';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { StudentService } from 'src/services/student.service';
import { TurnService } from "src/services/turn.service";
import { Turn } from 'src/models/turn.entity';
@Controller('currentlibrary')
export class CurrentlibraryController {
  constructor(private studentService: StudentService, private turnService: TurnService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @Render('currentlibrary/index')
  async index(@Req() req: Request) {
    var studentList = await this.studentService.getCurrent();
    return {
      studentList: studentList,
    };
  }

  @Post('/checkId')
  @UseGuards(AuthGuard('jwt'))
  async checkId(@Body('id') id: string) {
      let student = await this.studentService.getById(id);
      var turnOfStudent = new Turn();
      if (!student) {
          return {
              status: 'NOT_FOUND',
          };
      } else {
          if (student.currentStatus == true) {
              student.currentStatus = false;
              student.countInOut++;
              //Add turn out student
              turnOfStudent.turnInOut = false;
              turnOfStudent.student = await this.studentService.getOne(id);
          }
          else {
              let dateTime = new Date()
              student.currentStatus = true;
              student.countInOut++;
              student.updateAt = dateTime;
              //Add turn in student
              turnOfStudent.turnInOut = true;
              turnOfStudent.student = await this.studentService.getOne(id);
          }
          await this.turnService.add(turnOfStudent);
          await this.studentService.edit(student);
      }
  }

  @Post('/deleteAll')
  @UseGuards(AuthGuard('jwt'))
  async checkout(@Res() res) {
      var studentList = await this.studentService.getCurrent();
      for (let student of studentList) {
          //console.log(student.id);
          student.currentStatus = false;
          student.countInOut++;
          await this.studentService.edit(student);
          //Add turn out for student
          var turnOfStudent = new Turn();
          turnOfStudent.turnInOut = false;
          turnOfStudent.student = await this.studentService.getOne(student.id.toString());
          await this.turnService.add(turnOfStudent);
      }
      // let student = await this.studentService.getById(id);
      // if (student) {
      //   student.currentStatus = false;
      //   await this.studentService.edit(student);
      // }
      res.redirect('/currentlibrary');
  }


}
