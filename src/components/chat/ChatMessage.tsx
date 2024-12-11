import { Message } from "./types";
import { MessageSquare, UserRound } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  onOptionSelect?: (value: string) => void;
}

const ChatMessage = ({ message, onOptionSelect }: ChatMessageProps) => {
  return (
    <div className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''} mb-4`}>
      <div className="flex-shrink-0">
        {message.type === 'bot' ? (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <UserRound className="w-4 h-4 text-gray-600" />
          </div>
        )}
      </div>
      
      <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-primary text-white' : 'bg-gray-100'} rounded-lg p-3`}>
        <p className="text-sm">{message.content}</p>
        
        {message.options && message.options.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.options.map((option) => (
              <button
                key={option.value}
                onClick={() => onOptionSelect?.(option.value)}
                className="w-full text-left px-3 py-2 text-sm rounded-md bg-white hover:bg-gray-50 transition-colors border border-gray-200"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;