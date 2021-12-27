import { StudentService } from 'src/services/student.service';
import { UserService } from 'src/services/user.service';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "src/models/student.entity";
import { User } from "src/models/user.entity";
import { JwtStrategy } from "../auth/jwt.strategy";
import { StudentController } from "./student.controller";
import { UserController } from "./user.controller";
import {CurrentlibraryController} from "./currentlibrary.controller";
import { SeatingmapController} from "./seatingmap.controller";
import { MapService} from 'src/services/map.service';
import {Map} from "src/models/map.entity";
import { Library608Controller} from "./library608.controller";
import { TurnService } from 'src/services/turn.service';
import { TurnController } from './turn.controller';
import { Turn } from './../../models/turn.entity';
import { ChartController } from './chart.controller';
@Module({
    imports: [TypeOrmModule.forFeature([User,Turn, Student,Map])],
    providers: [UserService, StudentService, JwtStrategy,TurnService,MapService],
    controllers: [UserController,ChartController, StudentController,TurnController,CurrentlibraryController,SeatingmapController,Library608Controller]
})
  
export class MainModule { }
