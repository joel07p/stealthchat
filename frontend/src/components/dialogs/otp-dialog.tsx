import { sendOTP } from "@/api/auth.requests"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { OTPLoginProps } from "@/utils/types"
import { useState } from "react"
import { Button } from "../ui/button"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../ui/input-otp"
import { Label } from "../ui/label"

export const OTPDialog = ({ onSubmit }: OTPLoginProps) => {
    const [value, setValue] = useState("")

    const handleLogin = () => {
        onSubmit(value)
    }

    return <>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => sendOTP()}>Enter Code</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Enter OTP</DialogTitle>
                <DialogDescription>
                    Enter your OTP code sent to you by email to login to your account.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="code" className="text-right">
                            Code
                        </Label>
                        <InputOTP
                            maxLength={6}
                            value={value}
                            onChange={(value) => setValue(value)}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleLogin}>Login</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}