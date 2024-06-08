import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
<<<<<<< HEAD
=======
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
>>>>>>> 998973386d70ce879356b6b41b7df5a708a5217e
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
<<<<<<< HEAD
  ContextMenuTrigger
} from "@/components/ui/context-menu"
import { useUser } from "@/hooks/use-user"
import { cn } from "@/lib/utils"
import { DateTime } from "luxon"
import { ReactElement } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ImageDisplay } from "./attachments/image-display"
=======
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { DateTime } from "luxon"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
>>>>>>> 998973386d70ce879356b6b41b7df5a708a5217e

type MessageProps = {
  children?: React.ReactNode
  id: string
  message: string
  username: string
  sentAt: string
  type?: string
  roomId: string | undefined,
  isEditing: boolean
  onDeleteMessage: (messageId: string) => void
  onUpdateMessage: (messageId: string, messageText: string) => void
}

enum MessageType {
  MESSAGE = "message",
  IMAGE = "image",
  FILE = "file",
  CODE = "code",
}

export const Message = ({id, message, username, sentAt, type, roomId, isEditing, onDeleteMessage, onUpdateMessage}: MessageProps) => {
  const {userOwnsMessage} = useUser()

  const copyMessageText = (): void => {
    navigator.clipboard.writeText(message)
  }

  const selectComponent = (): ReactElement<any, any> | null | undefined => {
    if(!type) return null
    else if(type === MessageType.MESSAGE) return null
    else if(type === MessageType.IMAGE) return <ImageDisplay roomId={roomId}/>
  }

  const component = selectComponent()

  return <>
    <ContextMenu>
      <ContextMenuTrigger className="text-sm">
        <Card className={cn("mt-6 border border-dashed", isEditing && "border-blue-500")}>
          {
            component === null ?? (
              <CardContent>{component}</CardContent>
            )
          }
          <CardHeader>
            <CardTitle>
              {username}
            </CardTitle>
            <CardDescription>
              {DateTime.fromISO(sentAt).toLocaleString(DateTime.DATETIME_SHORT)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {message}
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem
          onClick={() => copyMessageText()}
          inset
        >
          Copy
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Replay
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Forward
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem
          className={cn(
            !userOwnsMessage(username) ? "hidden" : ""
          )}
          onClick={() => onUpdateMessage(id, message)}
          inset
        >
          Edit
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem
          className={cn(
            !userOwnsMessage(username) ? "hidden" : ""
          )}
          onClick={() => onDeleteMessage(id)}
          inset
        >
          Delete
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              Save Page As...
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Show Bookmarks Bar
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
      </ContextMenuContent>
    </ContextMenu>
  </>
}