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

export const JoinGroupDialog = () => {
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
                        Users
                    </Label>
                    <Input id="name" value="#an38fld" className="col-span-3" />
                </div>
                </div>
                <DialogFooter>
                <Button type="submit"></Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}