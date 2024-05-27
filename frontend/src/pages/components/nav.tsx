"use client"

import { CreateRoomDialog } from "@/components/dialogs/create-room-dialog"
import { buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useRoom } from "@/hooks/use-room"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

interface NavProps {
  isCollapsed: boolean
  groupId: string | undefined
}

export function RoomNavigation({ groupId, isCollapsed }: NavProps) {
  const {rooms, createRoom} = useRoom(undefined, groupId)

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 h-[calc(100vh-52px)]"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {rooms && rooms.map((room, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to={`room/${room.id}`}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-9 w-9",
                    /*link.variant === "default" &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"*/
                  )}
                >
                  {/*<link.icon className="h-4 w-4" />*/}
                  <span className="sr-only">{room.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {room.name}
                {room.name && (
                  <span className="ml-auto text-muted-foreground">
                    {room.name}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              to={`room/${room.id}`}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                /*link.variant === "default" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",*/
                "justify-start"
              )}
            >
              {/*<link.icon className="mr-2 h-4 w-4" />*/}
              {room.name}
              {room.name && (
                <span
                  className={cn(
                    "ml-auto",
                    /*link.variant === "default" &&
                      "text-background dark:text-white"*/
                  )}
                >
                  {room.name}
                </span>
              )}
            </Link>
          )
        )}
      </nav>
      <CreateRoomDialog
        onCreateRoom={(name, permissions) => createRoom(name, permissions)}
      />
    </div>
  )
}
