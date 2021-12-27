import { Response } from 'express';
import { Controller, Get, Render, Res } from "@nestjs/common";

@Controller()
export class ExceptionController {
    @Get('/403')
    @Render('errors/403')
    async page403(@Res() res: Response) {
        
    }
    @Get('/500')
    @Render('errors/500')
    async page401(@Res()res: Response){
        
    }
    @Get('/404')
    @Render('errors/404')
    page404(){

    }
}
