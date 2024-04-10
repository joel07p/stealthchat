import { OTPDialog } from "@/components/dialogs/otp-dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginCardProps } from "@/utils/types"
import { useRef, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { useAuth } from "../provider/auth-provider"
import { useNavigate } from "react-router-dom"
import { otpLogin } from "@/api/auth.requests"

export const SignInCard = ({ onSubmit }: LoginCardProps) => {
    const [switchState, setSwitchState] = useState(false)
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const { setSignedInState } = useAuth()
    const navigate = useNavigate()

    const handleLogin = () => {
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value

        if(username && password) {
            onSubmit(username, password);
        }
    }

    const handleOTPLogin = (otp: string) => {
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value

        if(username && password) {
            otpLogin({ username, password, otp }, setSignedInState, navigate)
        }
    }

    return <>
        <Card>
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                    Enter your Username and Password to continue. Click save when you're done.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" ref={usernameRef} defaultValue="Test10" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" ref={passwordRef} defaultValue="123" />
                </div>
                <div className="flex items-center space-x-3">
                    <Switch id="airplane-mode" className="mt-3" checked={switchState} onCheckedChange={setSwitchState} />
                    <Label htmlFor="airplane-mode" className="mt-3">Enable 2FA</Label>
                </div>
            </CardContent>
            <CardFooter>
                {switchState ? <OTPDialog onSubmit={handleOTPLogin} /> : <Button className="w-full" onClick={handleLogin}>Login</Button>}
            </CardFooter>
        </Card>
    </>
}