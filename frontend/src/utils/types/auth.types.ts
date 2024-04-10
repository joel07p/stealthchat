export type Credentials = {
    username: string
    password: string
}

export type OTPCredentials = Credentials & {
    otp: string
}

export type RegisterCredentials = Credentials & {
    email: string
}