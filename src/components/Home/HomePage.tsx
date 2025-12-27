
import { Globe } from "./Globe";
import { ChatInput } from "../Chat/ChatInput";
import { useChat } from "@/hooks/useChat";
import { HomeSidebar } from "./HomeSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export const HomePage = () => {
    const { isLoading, sendUserMessage } = useChat();

    return (
        <SidebarProvider>
            {/* Sidebar with Glass Effect */}
            <HomeSidebar />

            {/* Main Content Area */}
            <SidebarInset className="relative w-full h-[100svh] overflow-hidden bg-slate-950">

                {/* 3D Background */}
                <div className="absolute inset-0 z-0">
                    <Globe />
                </div>

                {/* Top Header Area (Trigger + Title) */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-4">
                    <SidebarTrigger className="text-white hover:bg-white/20 border-0 opacity-0 hover:opacity-100 transition-opacity duration-300" />

                    <div className="flex flex-col z-20 pointer-events-none mt-6 ml-4">
                        <h1 className="text-5xl md:text-6xl font-serif text-white tracking-wide drop-shadow-lg">
                            Traverse AI
                        </h1>
                        <p className="text-white/60 text-sm md:text-base tracking-[0.2em] font-light mt-2 uppercase">
                            "Not all those who wander are lost"
                        </p>
                    </div>
                </div>

                {/* Main Content Overlay - (Removed centered title) */}

                {/* Floating Chat Input with Glass Variant */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6 flex justify-center pb-12">
                    <div className="w-full max-w-3xl">
                        <ChatInput
                            onSend={sendUserMessage}
                            isLoading={isLoading}
                            variant="glass"
                        />
                    </div>
                </div>

            </SidebarInset>
        </SidebarProvider>
    );
};
