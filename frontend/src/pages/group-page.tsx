import { useGroup } from "@/hooks/use-group"
import { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router-dom"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { RoomNavigation } from "./components/nav"
import GroupInfoBar from "@/components/chat/group-info-bar"
import { ChatFallback } from "@/components/chat-fallback"
import { Button } from "@/components/ui/button"

export const GroupPage = () => {
  const { groupId, roomId } = useParams<{ groupId: string, roomId: string }>()
  const { group } = useGroup(groupId)
  const defaultLayout = [400, 440, 655]
  const navCollapsedSize = 4
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    console.log(roomId)
    console.log(typeof roomId)
  }, [groupId, roomId])

  return (
    <>
      <TooltipProvider delayDuration={0}>
        <div className="flex flex-col h-screen">
          <ResizablePanelGroup
            direction="horizontal"
            onLayout={(sizes: number[]) => {
              document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
            }}
            className="flex-grow items-stretch"
          >
            <ResizablePanel
              defaultSize={defaultLayout[0]}
              collapsedSize={navCollapsedSize}
              collapsible={false}
              minSize={0}
              maxSize={100}
              className={cn(
                isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out"
              )}
            >
              <div className="flex flex-col h-full">
                <div className={cn("flex h-[7vh] items-center justify-center", isCollapsed ? "h-[52px]" : "px-2")}>
                  <GroupInfoBar groupP={group} />
                </div>
                <Separator />
                <div className="flex-grow overflow-y-auto">
                  <RoomNavigation groupId={groupId} isCollapsed={isCollapsed} />
                </div>
                <Separator />
                <div className="flex flex-col items-center justify-center p-4">
                  <Button className="w-full mb-4" variant="outline">Action 1</Button>
                  <Button className="w-full" variant="outline">Action 2</Button>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={defaultLayout[2]}>
              {roomId === "undefined" ? <ChatFallback /> : <Outlet />}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </TooltipProvider>
    </>
  )
}