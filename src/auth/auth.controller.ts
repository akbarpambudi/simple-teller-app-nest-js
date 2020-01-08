import {
  Controller,
  UseGuards,
  Post,
  Request,
  Body,
  Get,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() req): Promise<any> {
    return this.authService.signIn(req.username, req.password);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('auth/profile')
  async profile(@Request() req: any): Promise<any> {
    return req.user;
  }
}
