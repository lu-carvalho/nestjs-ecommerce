import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // JWT will be extracted as a bearer token
      ignoreExpiration: false, // delegates ensuring JWT hasn't expired to Passport module
      secreteOrKey: process.env.JWT_SECRET, // signs the token
    });
  }

  // the payload returned is the JWT decoded as JSON, used to return user object.
  async validation(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
}
