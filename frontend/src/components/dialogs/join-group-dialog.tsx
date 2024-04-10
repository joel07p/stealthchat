import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ChangeEvent, useState } from "react"

type JoinGroupProps = {
    onJoinGroup: (joinCode: string) => void
}

export const JoinGroupDialog = ({ onJoinGroup }: JoinGroupProps) => {
    const [code, setCode] = useState("")

    const handleCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value)
    }

    const handleJoinGroup = () => {
        onJoinGroup(code)
    }

    return <>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Join</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Join Group</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="identityCode" className="text-right">
                        Join Code
                    </Label>
                    <Input id="name" value={code} onChange={handleCodeChange} className="col-span-3" />
                </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleJoinGroup}>Join</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}