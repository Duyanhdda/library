import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TurnService } from "src/services/turn.service";


@Controller('turn')
export class TurnController {
    constructor(private turnService: TurnService) { }
    @Post("/getHistoryTurn")
    @UseGuards(AuthGuard('jwt'))
    async getHistoryTurn(@Body('id') id: string) {
        let turnOfStudentList = await this.turnService.getListTurn(id);
        //console.log(id);
        //console.log(turnOfStudentList);
        return {
            turnOfStudent: turnOfStudentList
        }
    }
    @Post("/getall")
    async getall() {
        let turnOfStudent = await this.turnService.getdata();
        //console.log(id);
        //console.log(turnOfStudentList);
        return {
            turnOfStudent: turnOfStudent
        }
    }
}
