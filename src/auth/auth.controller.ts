import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ProfileResponse } from './respones';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login with email and password' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto, @Request() req) {
    return await this.service.login(req.user);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register Api summary' })
  async register(@Body() dto: RegisterDto) {
    return await this.service.register(dto);
  }

  @Get('/profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Profile Api summary' })
  @ApiResponse({ status: 200, type: ProfileResponse })
  @UseGuards(AuthGuard('jwt'))
  async profile(@Request() req) {
    return {
      id: req.user.id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
    };
  }
}
