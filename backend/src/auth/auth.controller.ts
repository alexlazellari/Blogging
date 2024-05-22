import { Controller, Get, Post, Request, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';
import { users } from 'src/users/users.service';
import { GetUser } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const token = await this.authService.login(req.user);
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set secure flag in production
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
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
  isAuth(@GetUser() username: string) {
    const user = users.find((user) => user.username === username);
    return { status: 'ok', user };
  }
}
