import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class BaseAuth {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class OTPAuth extends BaseAuth {
    @IsString()
    @IsNotEmpty()
    otp: string
}

export class SignUpDTO extends BaseAuth {
    @IsNotEmpty()
    @IsEmail()
    email: string
}