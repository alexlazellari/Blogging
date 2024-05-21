import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          let token = null;
          console.log(req.headers.cookie);
          if (req && req.headers && req.headers.cookie) {
            const cookies = req.headers.cookie.split(';');
            for (const cookie of cookies) {
              const [name, value] = cookie.split('=');
              if (name.trim() === 'access_token') {
                token = decodeURIComponent(value.trim());
                break;
              }
            }
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
