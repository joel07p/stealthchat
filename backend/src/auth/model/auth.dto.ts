import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

class BaseAuth {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class SignInDTO extends BaseAuth {
    @IsNotEmpty()
    @IsBoolean()
    otpEnabled: boolean
}

export class SignUpDTO extends BaseAuth {
    @IsNotEmpty()
    @IsEmail()
    email: string
}