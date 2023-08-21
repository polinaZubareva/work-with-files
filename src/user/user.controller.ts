import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() userDto: DtoUser) {
  //   return this.userService.createUser(userDto);
  // }

  @Get(':id')
  findOneId(@Param('id') id: number) {
    return this.userService.findOne('id', id);
  }

  @Get()
  findOne(@Body() { field, value }) {
    return this.userService.findOne(field, value);
  }

  @Delete()
  delete(@Body() login: string) {
    return this.userService.deleteUser(login);
  }
}
