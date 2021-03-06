import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { UserRole } from 'src/constants/user.constant';
import { UserService } from 'src/services/user.service';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(private userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'https://mysterious-basin-07133.herokuapp.com/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      role: UserRole.STUDENT,
    };
    const oldUser = await this.userService.getOne(user.email);

    if (oldUser) {
      if (oldUser.role != UserRole.STUDENT) {
        await this.userService.update(user.email, oldUser);
        user.role = oldUser.role;
      }
    }
    return user;
  }
}
