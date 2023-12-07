import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { Passports } from '@app/common/presentations/enums/passport.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, Passports.GOOGLE) {
  constructor(private readonly config: ConfigService) {
    super({
      clientID: config.get('OAUTH2_CLIENT_ID') || 'default',
      clientSecret: config.get('OAUTH2_CLIENT_SECRET') || 'default',
      callbackURL: config.get('OAUTH2_GOOGLE_CALLBACK') || 'default',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback
  ) {
    const { id, name, emails, photos } = profile;
    const user = {
      provider: Passports.GOOGLE,
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
    };

    done(null, user);
  }
}
