
import { UserService } from './../../services/user.service';
import { Response, Request } from 'express';
import { Controller, Get, Render, Post, Body, Res, UseGuards } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/models/user.entity';
import { RoleGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/constants/user.constant';


@Controller("user")
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Render("user/index")
    async index() {
        const userList = await this.userService.getAll();
        //console.log(userList);
        return {
            userList: userList
        };
    }

    @Post("add")
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    async add(@Body() user: User, @Res() res: Response) {
        // Hash: U -> K
        const salt = await bcrypt.genSalt(15);
        user.password = await bcrypt.hash(user.password, salt);
        await this.userService.add(user);
        return res.redirect("/user");
    }

    @Post("/edit")
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    async edit(@Res() res: Response, @Body() user: any) {
        var userToEdit: User = new User();
        userToEdit.email = user.email;
        userToEdit.password = user.password;
        const salt = await bcrypt.genSalt(15);
        userToEdit.password = await bcrypt.hash(userToEdit.password, salt);
        //console.log(userToEdit);
        await this.userService.edit(userToEdit);
        res.redirect("/user");
    }

    @Post("/delete")
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    async delete(@Res() res: Response, @Body() user: any) {
        //console.log("Delete");
        await this.userService.delete(user);
        res.redirect("/user");
    }
}
