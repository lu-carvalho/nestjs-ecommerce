import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticateUser(username: string, password: string): Promise<any> {
    const userLoginIn = await this.userService.findUserByUsername(username);
    const isRightPassword = await bcrypt.compare(
      password,
      userLoginIn.password,
    );

    if (userLoginIn && isRightPassword) {
      return userLoginIn;
    }
    return null;
  }

  async logUserAsJWT(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
