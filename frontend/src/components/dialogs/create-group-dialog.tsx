import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { ChangeEvent, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

type CreateGroupProps = {
    onCreateGroup: (name: string, description: string, users: Array<string>) => void
}

export const CreateGroupDialog = ({ onCreateGroup }: CreateGroupProps) => {
    const [user, setUser] = useState("")
    const [name, setName] = useState("Cool Group");
    const [description, setDescription] = useState("");
    const [users, setUsers] = useState<Array<string>>([])
    
    const handleAddUser = () => {
        setUsers([...users, user])
        setUser("")
    }

    const handleChangeUser = (event: ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value)
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleCreateGroup = () => {
        onCreateGroup(name, description, users)
        setName("")
        setDescription("")
    }

    return <>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Create Group</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input id="name" value={name} onChange={handleChangeName} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Description
                    </Label>
                    <Input id="name" value={description} onChange={handleChangeDescription} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="joinCode" className="text-right">
                        Code
                    </Label>
                    <Input id="name" value={user} onChange={handleChangeUser} className="col-span-3" />
                </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAddUser}>Add User</Button>
                    <Button type="submit" onClick={handleCreateGroup}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}