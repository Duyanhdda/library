
import { Response, Request } from 'express';
import { Controller, Get, Render, Post, Body, Res, UseGuards } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import {MapService} from 'src/services/map.service';
import { Map } from 'src/models/map.entity';
@Controller("seatingmap")
export class SeatingmapController {
    constructor(private mapService: MapService) { }
    @Get()
    @UseGuards(AuthGuard('jwt'))
    @Render("seatingmap/index")
    async index() {
    }
    @Post('/delete')
    @UseGuards(AuthGuard('jwt'))
    async deleteall(@Res() res: Response){
        var maplist = await this.mapService.getAll();
        for (let map of maplist){
            map.state = false;
            await this.mapService.edit(map);
        }
        res.redirect('/seatingmap');
    }
    @Post('/add')
    @UseGuards(AuthGuard('jwt'))
    async addmap(@Res() res: Response, @Body() map: any){
        if (map.quantity < 1 ) res.redirect('/seatingmap');
        for ( let i = 0 ; i < map.quantity ; i++ ){
            var p = new Map();
            await this.mapService.add(p);
        }
        res.redirect('/seatingmap');
    }
    @Post('/update')
    @UseGuards(AuthGuard('jwt'))
    async update(@Res() res: Response, @Body('id') id: string){
        //console.log(id);
        var map =  await this.mapService.getById(id);
        if ( map.state == true){
            map.state = false;
        }
        else 
            map.state = true;
        await this.mapService.edit(map);
        res.redirect('/seatingmap');
    }
    @Post('/getdata')
    async getdata2() {
        var maplist = await this.mapService.getAll();
        //console.log(maplist);
        return {
            maplist: maplist,
        }
    }

}