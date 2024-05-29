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
  const { rooms, createRoom } = useRoom(undefined, groupId)

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 h-full"
    >
      {rooms && rooms.length > 0 ? (
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 overflow-y-auto">
          {rooms.map((room, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to={`room/${room.id}`}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "h-9 w-9",
                    )}
                  >
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
                  "justify-start"
                )}
              >
                {room.name}
                {room.name && (
                  <span className={cn("ml-auto")}>
                    {room.name}
                  </span>
                )}
              </Link>
            )
          )}
        </nav>
      ) : (
        <p className="text-sm text-gray-500 ml-3">No rooms available</p>
      )}
      <CreateRoomDialog onCreateRoom={(name, permissions) => createRoom(name, permissions)} />
    </div>
  )
}
