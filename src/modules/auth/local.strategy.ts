import { UserService } from './../../services/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    //LocalStrategy là phương thức đăng nhập bằng tài khoản + pass được lưu trong database của mình
    constructor(private userService: UserService) {
        super({
            usernameField: 'email'
        });
    }
    // Authentication: Xác thực
    // Authorization: Xác minh
    async validate(email: string, password: string) {
        const user = await this.userService.getOne(email);
        //console.log(user);
        if (!user) throw new UnauthorizedException("Không tồn tại tài khoản này");
        if (!(await bcrypt.compare(password, user.password))) throw new UnauthorizedException("Sai tài khoản hoặc mật khẩu");
        return { //Return 1 cái json
            email: user.email
        };
        //return user; Nó sẽ không login được, nó báo lỗi ?? Why
    }
}