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
import '@tensorflow/tfjs-node';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DtoUser } from './user.type';

@UseGuards(JwtAuthGuard)
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOneId(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne('id', id);
  }

  @Get()
  async findOne(@Body() { field, value }) {
    return await this.userService.findOne(field, value);
  }

  @Delete()
  async delete(@Body() login: string) {
    return await this.userService.deleteUser(login);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: DtoUser
  ) {
    return await this.userService.updateUser(id, userDto);
  }
}
