import { addDays, addHours, format, nextSaturday } from "date-fns"

import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
} from "lucide-react"

import { Message } from "@/components/chat/message"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useMessage } from "@/hooks/use-message"
import { useRoom } from "@/hooks/use-room"
import { useSocket } from "@/hooks/use-socket"
import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useUser } from "@/hooks/use-user"
import { useGroup } from "@/hooks/use-group"

export const ChatPage: React.FC = () => {
  const [messageText, setMessageText] = useState<string>("")
  const [updateMessageFlag, setUpdateMessageFlag] = useState<boolean>(false)
  const [targetMessageId, setTargetMessageId] = useState<string>("")
  const chatAreaRef = useRef<HTMLDivElement | null>(null)
  const {roomId, groupId} = useParams<{roomId: string, groupId: string}>()
  const {room} = useRoom(roomId, groupId)
  const {socket} = useSocket(roomId, groupId)
  const {messages, addMessage, updateMessage, deleteMessage} = useMessage(socket, roomId)
  const today = new Date()
  const {username} = useUser()
  const {group} = useGroup(groupId)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = (): void => {
    if(!chatAreaRef.current) return
    chatAreaRef.current.scrollIntoView(false)
  }

  const handleAddMessage = (e: any): void => {
    e.preventDefault()
    if(updateMessageFlag) {
      updateMessage({messageId: targetMessageId, roomId, messageText})
      setUpdateMessageFlag(false)
      setTargetMessageId("")
    } else {
      addMessage({message: messageText, roomId, attachment: {}})
    }
    setMessageText("")
  }

  const handleDeleteMessage = (messageId: string): void => {
    deleteMessage({messageId, roomId})
  }

  const handleUpdateMessage = (messageId: string, messageText: string): void => {
    setUpdateMessageFlag(true)
    setMessageText(messageText)
    setTargetMessageId(messageId)
  }

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if(e.key === "Enter") handleAddMessage(e)
  } 

  return <>
    <div className="flex h-full flex-col h-screen">
      <div className="flex items-center p-2 h-[7vh]">
        <div className="flex items-center gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">{username}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/docs/components">{group?.name}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{room?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Archive className="h-4 w-4" />
                <span className="sr-only">Archive</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Archive</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <ArchiveX className="h-4 w-4" />
                <span className="sr-only">Move to junk</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to junk</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Move to trash</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to trash</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Tooltip>
            <Popover>
              <PopoverTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Clock className="h-4 w-4" />
                    <span className="sr-only">Snooze</span>
                  </Button>
                </TooltipTrigger>
              </PopoverTrigger>
              <PopoverContent className="flex w-[535px] p-0">
                <div className="flex flex-col gap-2 border-r px-2 py-4">
                  <div className="px-4 text-sm font-medium">Snooze until</div>
                  <div className="grid min-w-[250px] gap-1">
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Later today{" "}
                      <span className="ml-auto text-muted-foreground">
                        {format(addHours(today, 4), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Tomorrow
                      <span className="ml-auto text-muted-foreground">
                        {format(addDays(today, 1), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      This weekend
                      <span className="ml-auto text-muted-foreground">
                        {format(nextSaturday(today), "E, h:m b")}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                    >
                      Next week
                      <span className="ml-auto text-muted-foreground">
                        {format(addDays(today, 7), "E, h:m b")}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="p-2">
                  <Calendar />
                </div>
              </PopoverContent>
            </Popover>
            <TooltipContent>Snooze</TooltipContent>
          </Tooltip>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Reply className="h-4 w-4" />
                <span className="sr-only">Reply</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <ReplyAll className="h-4 w-4" />
                <span className="sr-only">Reply all</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply all</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Forward className="h-4 w-4" />
                <span className="sr-only">Forward</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Forward</TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
            <DropdownMenuItem>Star thread</DropdownMenuItem>
            <DropdownMenuItem>Add label</DropdownMenuItem>
            <DropdownMenuItem>Mute thread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      <div className="flex flex-1 flex-col">
        <Separator />
        <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
          <ScrollArea className="w-full h-[63vh] rounded-md p-4">
            <div ref={chatAreaRef}>
              {
                messages.map((message) => (
                  <Message
                    key={message.id}
                    id={message.id}
                    message={message.message}
                    username={message.username}
                    sentAt={message.sentAt}
                    type={message.type}
                    roomId={roomId}
                    isEditing={message.id === targetMessageId}
                    onDeleteMessage={(messageId: string) => handleDeleteMessage(messageId)}
                    onUpdateMessage={(messageId: string, messageText: string) => handleUpdateMessage(messageId, messageText)}
                  /> 
                ))
              }
            </div>
          </ScrollArea>
        </div>
        <div className="p-8 h-[30vh]">
          <form>
            <div className="grid gap-4">
              <Textarea
                className="p-4"
                placeholder={`Reply...`}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <div className="flex items-center">
                <Label
                  htmlFor="mute"
                  className="flex items-center gap-2 text-xs font-normal"
                />
                <Button
                  onClick={(e) => handleAddMessage(e)}
                  size="sm"
                  className="ml-auto"
                >
                  Send
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
}