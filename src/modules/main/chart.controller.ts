
import { Response, Request } from 'express';
import { Controller, Get, Render, Post, Body, Res, UseGuards } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { StudentService } from 'src/services/student.service';
import { Student } from 'src/models/student.entity';
import { sortBy } from 'sort-by-typescript';


@Controller("chart")
export class ChartController {
    constructor(private studentService: StudentService){}
    @Get()
    @Render("chart/index")
    async index() {
        var studentList = await this.studentService.getAll();
        var arraytop =  new Array<Student>();
        studentList.sort(sortBy('countInOut'));
        //console.log(studentList);
        for (var i = 0; i < 5; i++){
            arraytop.push(studentList[studentList.length - 1-i]);
        }
        var sumofinout = 0;
        var currentinlibrary = 0;
        for (var i = 0; i < studentList.length; i++){
            sumofinout+=studentList[i].countInOut;
            if(studentList[i].currentStatus==true){
                currentinlibrary++;
            }
        }
        return {
            currentinlibrary:currentinlibrary,
            sumofinout:sumofinout,
            sumofstudent : studentList.length,
            arraytop : arraytop,
        };
    }

}
// const array2 = [ {id: 1, val: 60}, {id: 2, val: 2}, {id: 3, val: 89}, {id: 4, val: 78}];
// const max2 = array2.reduce((op, item) => op = op > item.val ? op : item.val, 0);