import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Public, User } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { BaseAuth, OTPAuth, SignUpDTO } from './model';
import { OTPService } from './otp.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private otpService: OTPService
    ) {}

    @Public()
    @Post('signin')
    signIn(@Body() credentials: BaseAuth) {
        return this.authService.signIn(credentials)
    }

    @Public()
    @Post('signup')
    signUp(@Body() credentials: SignUpDTO) {
        return this.authService.signUp(credentials)
    }

    @Post('logout')
    logout(@User('sub') userId: string) {
        return this.authService.logout(userId)
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    refreshTokens(@User('sub') userId: string, @Body() data: any) {
        return this.authService.refreshTokens(userId, data.refreshToken)
    }
/*
    @Public()
    @Post('otp/send')
    async getAccessCode() {
        await this.otpService.sendOTP()
    }
*/
    @Public()
    @Post('otp/verify')
    verifyAccessCode(@Body() credentials: OTPAuth) {
        return this.otpService.verifyOTP(credentials)
    }
}
