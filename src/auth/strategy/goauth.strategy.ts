import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { VerifiedCallback } from 'passport-jwt';

export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ['email', 'profile'],
    });
  }

  async validate(profile: Profile, done: VerifiedCallback): Promise<any> {
    const user = {
      email: profile.emails?.[0].value,
      name: profile.displayName,
      provider: 'google',
    };
    console.log('GoogleOauthStrategy::validate', user);

    done(null, user);
  }
}
