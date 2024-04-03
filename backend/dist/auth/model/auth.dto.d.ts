declare class BaseAuth {
    username: string;
    password: string;
}
export declare class SignInDTO extends BaseAuth {
    otpEnabled: boolean;
}
export declare class SignUpDTO extends BaseAuth {
    email: string;
}
export {};
