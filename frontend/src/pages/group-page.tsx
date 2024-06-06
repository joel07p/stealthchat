import { ChatFallback } from "@/components/chat-fallback"
import GroupInfoBar from "@/components/chat/group-info-bar"
import { Button } from "@/components/ui/button"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useGroup } from "@/hooks/use-group"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Outlet, useParams } from "react-router-dom"
import { RoomNavigation } from "./components/nav"

export const GroupPage: React.FC = () => {
  const [isCollapsed, ] = useState(false)
  const {groupId, roomId} = useParams<{ groupId: string, roomId: string }>()
  const {group} = useGroup(groupId)
  
  const defaultLayout = [400, 440, 655]
  const navCollapsedSize = 4

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
