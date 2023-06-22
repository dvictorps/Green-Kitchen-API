import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto){
    return this.authService.signup(dto);
  }
  
  @Post('signin')
  signin(@Body() dto:SigninDto, @Req() req, @Res() res){
    return this.authService.signin(dto, req, res);
  }
  
  @Post('signout')
  signout(@Req() req, @Res() res){
    return this.authService.signout(req, res);
  }
}
