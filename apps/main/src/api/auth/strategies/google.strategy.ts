import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { EnvService } from '@app/common/env/env.service';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { Passports } from '@app/common/presentations/enums/passport.enum';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, Passports.GOOGLE) {
  constructor(private readonly envService: EnvService) {
    super({
      clientID: envService.get('OAUTH2_CLIENT_ID') || 'default',
      clientSecret: envService.get('OAUTH2_CLIENT_SECRET') || 'default',
      callbackURL: envService.get('OAUTH2_GOOGLE_CALLBACK') || 'default',
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
