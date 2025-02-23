import {
  Controller,
  Post,
  UsePipes, ValidationPipe,
  Body,
} from '@nestjs/common';
import { User } from 'src/model/user.model';
import { AuthService } from 'src/service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(@Body() user: User) {
    return await this.authService.loginUser(user);
  }

  @Post('/register')
  @UsePipes(new ValidationPipe())
  async register(@Body() user: User) {
    return await this.authService.registerUser(user);
  }
}
