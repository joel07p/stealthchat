import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RegisterCardProps } from "@/utils/types"
import { useRef } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export const SignUpCard = ({ onSubmit }: RegisterCardProps) => {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const handleRegister = () => {
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        const email = emailRef.current?.value

        if(username && password && email) {
            onSubmit(username, password, email);
        }
    }

    return <>
        <Card>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
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
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" ref={emailRef} defaultValue="Test10@gmail.com" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" ref={passwordRef} defaultValue="123" />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={handleRegister}>Register</Button>
            </CardFooter>
        </Card>
    </>
}