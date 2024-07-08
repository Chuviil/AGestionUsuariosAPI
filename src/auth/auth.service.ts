import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
  try {
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();
    return createdUser;
  } catch (error) {
    if (error.code === 11000) {
      throw new ConflictException('User already exists');
    }
  }
}

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
