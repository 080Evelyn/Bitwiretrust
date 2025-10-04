import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/Components/ui/popover";
import { ScrollArea } from "@/Components/ui/scroll-area";
// import { format } from "date-fns";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useResponsivePopover } from "@/hooks/viewportResize";
import { Skeleton } from "@/Components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { User2 } from "lucide-react";
import { AdminShareIcon } from "@/assets";

interface NotificationPopoverProps {
  trigger: React.ReactNode;
  isPending: boolean;
  notifications: string[];
}

const AdminNotification = ({
  trigger,
  notifications,
  isPending,
}: NotificationPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  useScrollLock(isOpen);
  useResponsivePopover(isOpen, setIsOpen);
  const messages = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "John Doe",
      message: "Hello, how are you?",
      date: "Jun 12th 2025 14:00:00",
      type: "message",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      title: "Gabriel purchased Airtime",
      date: "Jun 12th 2025 14:00:00",
    },
    {
      id: 3,
      name: "John Doe",
      message: "Hello, how are you? Did you see message 2 or you didnt",
      date: "Jun 12th 2025 14:00:00",
      type: "message",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      title: "Gabriel purchased Electricity",
      date: "Jun 12th 2025 14:00:00",
    },
  ];

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        {isOpen && (
          <div
            className="fixed inset-y-0 mt-27.5 lg:mt-16 right-0 w-full lg:w-[calc(100%-var(--sidebar-width))] bg-black/30 backdrop-blur-[2px] md:z-50 z-49"
            onClick={() => setIsOpen(false)}
          />
        )}

        <PopoverContent
          sideOffset={5}
          className="z-55 max-lg:h-[80dvh] h-[85dvh] md:pb-4 md:w-[340px] md:mr-4 mt-1 lg:mt-2 p-0 border border-[#F1F1F1] rounded-lg bg-white"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex justify-between items-center py-3 px-4">
            <span className="text-sm font-semibold text-[#7901b1]">
              Notifications(22)
            </span>
            <button className="text-[10px] cursor-pointer font-light text-muted-foreground">
              Mark as read
            </button>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="flex justify-start px-4 gap-5 w-full">
              <TabsTrigger
                value="all"
                className="group inline-flex items-baseline gap-1 text-[#8C8C8C] text-sm font-semibold cursor-pointer data-[state=active]:text-[#7910B1]"
              >
                <span>All</span>
                <span className="bg-[#8C8C8C] px-0.5 py-0.25 rounded-[3px] text-white font-semibold text-[8px] group-data-[state=active]:bg-[#B71FFF]/40 group-data-[state=active]:text-foreground">
                  22
                </span>
              </TabsTrigger>

              <TabsTrigger
                value="messages"
                className="group inline-flex items-baseline gap-1 text-[#8C8C8C] text-sm font-semibold cursor-pointer data-[state=active]:text-[#7910B1]"
              >
                <span>Messages</span>
                <span className="bg-[#8C8C8C] px-0.5 py-0.25 rounded-[3px] text-white font-semibold text-[8px] group-data-[state=active]:bg-[#B71FFF]/40 group-data-[state=active]:text-foreground">
                  22
                </span>
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[80vh] md:h-[65vh] lg:h-[75vh] px-3">
              <div className="flex flex-col gap-4.5 tracking-[-0.15px]">
                {isPending ? (
                  <div className="flex flex-col gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                  </div>
                ) : (
                  <>
                    <TabsContent value="all">
                      {" "}
                      {messages.map((message) => (
                        <div
                          className="flex items-start gap-2 border-t-1 border-[#D9D9D9] py-2"
                          key={message.id}
                        >
                          {message.image ? (
                            <img
                              src={message.image}
                              className="size-9 rounded-full"
                              alt="avatar"
                            />
                          ) : (
                            <div className="p-1 rounded-full bg-[#28003E]">
                              <User2 className="fill-[#B71FFF]/40 size-7" />
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="text-xs">
                              {message?.name || message?.title}
                            </span>
                            {message.message && (
                              <>
                                <span className="p-2 text-[10px] rounded-md bg-[#F1F1F1] text-[#8C8C8C]">
                                  {message.message}
                                </span>

                                <div className="flex gap-2 items-center py-0.5">
                                  <span className="text-[10px] text-[#7901b1]">
                                    Reply
                                  </span>
                                  <img src={AdminShareIcon} alt="share icon" />
                                </div>
                              </>
                            )}
                            <span className="text-[10px] text-[#8C8C8C]">
                              {message.date}
                            </span>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="messages" className="flex flex-col">
                      {messages
                        .filter((message) => message.type === "message")
                        .map((message) => (
                          <div
                            className="flex items-start gap-2 border-t-1 border-[#D9D9D9] py-2"
                            key={message.id}
                          >
                            {message.image ? (
                              <img
                                src={message.image}
                                className="size-9 rounded-full"
                                alt="avatar"
                              />
                            ) : (
                              <div className="p-1 rounded-full bg-[#28003E]">
                                <User2 className="fill-[#B71FFF]/40 size-7" />
                              </div>
                            )}
                            <div className="flex flex-col">
                              <span className="text-xs">{message.name}</span>
                              <span className="p-2 text-[10px] rounded-md bg-[#F1F1F1] text-[#8C8C8C]">
                                {message.message}
                              </span>
                              <div className="flex gap-2 items-center py-0.5">
                                <span className="text-[10px] text-[#7901b1]">
                                  Reply
                                </span>
                                <img src={AdminShareIcon} alt="share icon" />
                              </div>
                              <span className="text-[10px] text-[#8C8C8C]">
                                {message.date}
                              </span>
                            </div>
                          </div>
                        ))}
                    </TabsContent>
                    {notifications.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center mt-6">
                        No notifications found.
                      </p>
                    )}
                  </>
                )}
              </div>
            </ScrollArea>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AdminNotification;
