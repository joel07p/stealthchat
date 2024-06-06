import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useUser } from "@/hooks/use-user"
import { DateTime } from "luxon"
import { ReactElement } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ImageDisplay } from "./attachments/image-display"
import { cn } from "@/lib/utils"

type MessageProps = {
  children?: React.ReactNode
  id: string
  message: string
  username: string
  sentAt: string
  type?: string
  roomId: string | undefined,
  onDeleteMessage: (messageId: string) => void
}

enum MessageType {
  MESSAGE = "message",
  IMAGE = "image",
  FILE = "file",
  CODE = "code",
}

export const Message = ({id, message, username, sentAt, type, roomId, onDeleteMessage}: MessageProps) => {
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
        <Card className="mt-6 border border-dashed ">
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
        <ContextMenuItem inset>
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
        <ContextMenuRadioGroup value="pedro">
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioItem value="pedro">
            Pedro Duarte
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  </>
}