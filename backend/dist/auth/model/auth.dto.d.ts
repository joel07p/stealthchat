export declare class BaseAuth {
    username: string;
    password: string;
}
export declare class OTPAuth extends BaseAuth {
    otp: string;
}
export declare class SignUpDTO extends BaseAuth {
    email: string;
}
export declare class Email {
    email: string;
}
