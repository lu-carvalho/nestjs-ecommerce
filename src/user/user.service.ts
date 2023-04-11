import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userModel.create(createUserDto);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    return newUser.save();
  }

  async findUserByUsername(username: string): Promise<User> {
    const foundUser = await this.userModel.findOne({ username: username });
    return foundUser;
  }

  async deleteUserByUsername(username: string): Promise<User> {
    const deletedUser = await this.userModel.findOneAndDelete({
      username: username,
    });
    return deletedUser;
  }
}
