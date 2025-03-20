import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userDto: { name: string; email: string; password: string }) {
    const newUser = new this.userModel(userDto);
    return await newUser.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }
}
