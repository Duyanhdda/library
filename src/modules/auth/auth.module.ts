import { User } from '../../models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';
import { LocalStrategy } from './local.strategy';
import { UserService } from 'src/services/user.service';
@Module({
    imports: [
        PassportModule,
        ConfigModule.forRoot(),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: 60 * 30,
            },
        }),
        TypeOrmModule.forFeature([User])],
    providers: [JwtStrategy, GoogleStrategy, LocalStrategy, UserService],
    controllers: [AuthController],
})
export class AuthModule { }
