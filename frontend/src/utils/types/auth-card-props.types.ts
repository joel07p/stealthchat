export type LoginCardProps = {
    onSubmit: (username: string, password: string) => void
}

export type OTPLoginProps = {
    onSubmit: (otp: string) => void
}

export type RegisterCardProps = {
    onSubmit: (username: string, password: string, email: string) => void
}