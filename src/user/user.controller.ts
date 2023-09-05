import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DtoUser } from './user.type';

@UseGuards(JwtAuthGuard)
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOneId(@Param('id', ParseIntPipe) id: number) {
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

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() userDto: DtoUser) {
    return this.userService.updateUser(id, userDto);
  }

  @Post(':id/uploadVideo')
  uploadFile(@Param('id', ParseIntPipe) id: number, @UploadedFile() file) {
    return this.userService.uploadVideo(id, file);
  }
}
