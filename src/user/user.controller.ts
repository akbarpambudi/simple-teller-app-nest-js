import {
  Controller,
  Body,
  Post,
  Param,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './services/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/')
  public async createUser(@Body() body: CreateUserDto) {
    await this.userService.createUser(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  public async getLogInUser(@Request() req: any) {
    return await this.userService.findUserByUsername(req.user.username);
  }
}
