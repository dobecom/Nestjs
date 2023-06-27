import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '1059455141011-qqgamh3mt6cik4t72gg7ceocfaa2bg7h.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: process.env.OAUTH2_GOOGLE_CALLBACK,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { id, name, emails, photos } = profile;
    console.log(_accessToken);
    // console.log(_refreshToken);
    console.log(profile);

    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
    };
    console.log(user)

    done(null, user);
  }
}
