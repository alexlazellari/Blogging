import { Controller, Get, Post, Request, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';
import { GetUser } from './auth.decorator';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const token = await this.authService.login(req.user);
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set secure flag in production
      sameSite: 'lax',
      maxAge: 60 * 90 * 1000,
    });
    return res.status(200).send({ status: 'ok', message: 'Login successful' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  //Add a isAuth route to check if the user is authenticated
  @UseGuards(JwtAuthGuard)
  @Get('isAuth')
  async isAuth(@GetUser() userInfo: { username: string; id: number }) {
    const user = await this.userService.findOne(userInfo.username);
    return { status: 'ok', user };
  }
}
