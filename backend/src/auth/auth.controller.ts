import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './model';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    signIn() {}

    @Post('signup')
    signUp(@Body() credentials: SignUpDTO) {
        this.authService.signUp(credentials)
    }

    @Post('logout')
    logout() {}

    @Post('refresh')
    refreshTokens() {}
}
