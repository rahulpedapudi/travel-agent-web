import { Globe } from "./Globe";
import { ChatInput } from "../Chat/ChatInput";
import { useChatContext } from "@/contexts/ChatContext";

export const HomePage = () => {
  const { isLoading, sendUserMessage } = useChatContext();

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-950">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Globe />
      </div>

      {/* Top Header Area (Title only if needed, currently empty/hidden) */}
      {/* <div className="absolute top-4 left-4 z-20 flex items-center gap-4">
        
      </div> */}

      {/* Floating Chat Input with Glass Variant */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 flex flex-col items-center gap-6 pb-12">

        <div className="w-full max-w-3xl">
          <ChatInput
            onSend={sendUserMessage}
            isLoading={isLoading}
          // variant="glass"
          />
        </div>
      </div>
    </div>
  );
};
