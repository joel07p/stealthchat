import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

type CreateRoomProps = {
    onCreateRoom: (name: string, permissions: Array<string>) => void
}

export const CreateRoomDialog = ({ onCreateRoom }: CreateRoomProps) => {
  const [name, setName] = useState("");
  const [permission, setPermission] = useState("")
	const [permissions, setPermissions] = useState<Array<string>>(["default"])

  return <>
    <Dialog>
      <DialogTrigger asChild>
        <Button
            variant="link"
            size="sm"
        >Create</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Create Room</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="joinCode" className="text-right">
                        Permissions
                    </Label>
                    <Input id="name" value={permission} onChange={(e) => setPermission(e.target.value)} className="col-span-3" />
                </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => setPermissions([...permissions, permission])}>Add Permission</Button>
                    <Button type="submit" onClick={() => onCreateRoom(name, permissions)}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}