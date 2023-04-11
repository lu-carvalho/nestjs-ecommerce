import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // call constructor of parent class to access its properties and methods
    super();
  }

  async validateUser(username: string, password: string): Promise<any> {
    const userAccessing = await this.authService.authenticateUser(
      username,
      password,
    );

    if (!userAccessing) {
      throw new UnauthorizedException();
    }
    return userAccessing;
  }
}
