import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { Button } from "../ui/button";
import ChatbotDialog from "./ChatbotDialog";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25 transition-all duration-300"
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageSquare className="h-6 w-6 text-white" />
        )}
      </Button>
      <ChatbotDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};

export default ChatbotButton;