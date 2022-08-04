import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly service: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: '7c0mHxAypMcTWQ25m_UP9RHrUmlCgd3ChREmd',
    });
  }

  async validate(payload: any, done: VerifiedCallback): Promise<any> {
    const user = await this.service.validatePayload(payload);

    if (!user) {
      throw new UnauthorizedException();
    }

    return done(null, user, payload.iat);
  }
}
