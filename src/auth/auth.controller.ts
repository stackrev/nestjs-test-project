import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto, @Request() req) {
    return await this.service.login(req.user);
  }

  @Post('/register')
  async register(@Body() dto: RegisterDto) {
    return await this.service.register(dto);
  }

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  async profile(@Request() req) {
    return {
      user: req.user,
    };
  }
}
