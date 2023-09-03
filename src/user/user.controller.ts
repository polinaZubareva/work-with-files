import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DtoUser } from './user.type';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOneId(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne('id', id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@Body() { field, value }) {
    return this.userService.findOne(field, value);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  delete(@Body() login: string) {
    return this.userService.deleteUser(login);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() userDto: DtoUser) {
    return this.userService.updateUser(id, userDto);
  }
}
