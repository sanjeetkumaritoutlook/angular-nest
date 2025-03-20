import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //findAll() is moved to user.service.ts
    // @Get()
    // findAll() {
    //     return [{ id: 1, name: 'John Doe' }];
    //   } 

    @Post()
    async createUser(@Body() userData: { name: string; email: string; password: string }) {
      console.log('Received user data:', userData); // Debugging
      const user = await this.usersService.create(userData);
      return {
        message: 'User registered successfully!',
        user,
      };
    }
    
    
      @Get()
      async getUsers() {
        return this.usersService.findAll();
      }  
}
