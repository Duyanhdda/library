
import { Response, Request } from 'express';
import { Controller, Get, Render, Post, Body, Res, UseGuards } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import {MapService} from 'src/services/map.service';

@Controller("library608")
export class Library608Controller {
    constructor(private mapService: MapService) { }
    @Get()
    @Render("seatingmap/mapview")
    async index() {
    }
    @Post('/getdata')
    async getdata() {
        var maplist = await this.mapService.getAll();
        //console.log(studentList);
        return {
            maplist: maplist,
        }
    }

}