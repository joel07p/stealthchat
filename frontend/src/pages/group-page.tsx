import { useGroup } from "@/hooks/use-group"
import { useRoom } from "@/hooks/use-room"
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
import { buttonVariants } from "@/components/ui/button"
export const GroupPage = () => {
    const {groupId, roomId} = useParams<{groupId: string, roomId: string}>()

    const {group} = useGroup(groupId)

    const defaultLayout = [400, 440, 655]
    const navCollapsedSize = 4
    const [isCollapsed, setIsCollapsed] = useState(false)

    useEffect(() => {
        console.log(roomId)
        console.log(typeof roomId)
    }, [groupId, roomId])

    return <>
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes: number[]) => {
                  document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
                }}
                className="h-full max-h-[800px] items-stretch"
            >
                <ResizablePanel
                  defaultSize={defaultLayout[0]}
                  collapsedSize={navCollapsedSize}
                  collapsible={false}
                  minSize={15}
                  maxSize={20}
                  /*onCollapse={(collapsed: boolean) => {
                    setIsCollapsed(collapsed);
                    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(collapsed)}`;
                  }}*/
                  className={cn(
                    isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-[52px] items-center justify-center",
                      isCollapsed ? "h-[52px]" : "px-2"
                    )}
                  >
                    <h2>{group?.name}</h2>
                    {/*<AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />*/}
                  </div>
                  <Separator />
                  <RoomNavigation groupId={groupId} isCollapsed={isCollapsed} />
                  <Separator />
                </ResizablePanel>
                <ResizableHandle withHandle />
                {/*<ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                  <Tabs defaultValue="all">
                    <div className="flex items-center px-4 py-2">
                      <h1 className="text-xl font-bold">Inbox</h1>
                      <TabsList className="ml-auto">
                        <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
                          All mail
                        </TabsTrigger>
                        <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">
                          Unread
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    <Separator />
                    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                      <form>
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Search" className="pl-8" />
                        </div>
                      </form>
                    </div>
                    <TabsContent value="all" className="m-0">
                      <MailList items={mails} />
                    </TabsContent>
                    <TabsContent value="unread" className="m-0">
                      <MailList items={mails.filter((item) => !item.read)} />
                    </TabsContent>
                  </Tabs>
                </ResizablePanel>
                <ResizableHandle withHandle />*/}
                <ResizablePanel defaultSize={defaultLayout[2]}>
                    {
                        roomId === "undefined" ? (
                            <div>Fallback</div>
                        ) : (
                            <Outlet />
                        )
                    }
                  {/*<MailDisplay mail={mails.find((item) => item.id === mail.selected) || null} />*/}
                </ResizablePanel>
              </ResizablePanelGroup>
            </TooltipProvider>
    </>
}