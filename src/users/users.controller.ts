import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
 async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if(!user) {
      throw new NotFoundException('User not found');
    }
    return user;

}

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.usersService.find(email);
}

@Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const user = await this.usersService.remove(parseInt(id));
    if(!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

@Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
    const user = await this.usersService.update(parseInt(id), body);
    if(!user) {
      throw new NotFoundException('User not found');
    }
    return user;
}

}

//9 createting and saving end 8 start 9

