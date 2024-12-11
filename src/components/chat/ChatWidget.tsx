import { useState, useRef, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";
import { Message, UserProfile } from "./types";
import { chatFlow, determinePlan } from "./chatLogic";
import ChatMessage from "./ChatMessage";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          type: "bot",
          content: chatFlow.initial.content,
          options: chatFlow.initial.options,
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionSelect = (value: string, nextQuestion?: string) => {
    // Add user's response
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "user",
        content: prev[prev.length - 1].options?.find((o) => o.value === value)?.label || value,
      },
    ]);

    // Update user profile based on the current question
    const currentQuestion = messages[messages.length - 1];
    if (currentQuestion.options?.some((o) => o.value === "B2C")) {
      setUserProfile((prev) => ({ ...prev, businessModel: value as any }));
    } else if (currentQuestion.options?.some((o) => o.value === "1000")) {
      setUserProfile((prev) => ({ ...prev, productQuantity: value as any }));
    } else if (currentQuestion.options?.some((o) => o.value === "basic")) {
      setUserProfile((prev) => ({ ...prev, integrationType: value as any }));
    }

    // Handle final actions
    if (value === "consultant") {
      const plan = determinePlan(userProfile);
      toast({
        title: "Atendimento iniciado",
        description: "Em breve nossa equipe entrará em contato! 😊",
      });
      setIsOpen(false);
    } else if (value === "email") {
      toast({
        title: "Email registrado",
        description: "Você receberá mais informações em breve! 📧",
      });
      setIsOpen(false);
    } else if (value === "calculator") {
      navigate("/calculadora-dinamica");
      setIsOpen(false);
    } else if (nextQuestion && chatFlow[nextQuestion as keyof typeof chatFlow]) {
      const next = chatFlow[nextQuestion as keyof typeof chatFlow];
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "bot",
            content: next.content,
            options: next.options,
          },
        ]);
      }, 500);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col animate-fade-up">
          <div className="p-4 bg-primary text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">Chat com Ana</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-primary-dark rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onOptionSelect={(value) =>
                  handleOptionSelect(
                    value,
                    message.options?.find((o) => o.value === value)?.nextQuestion
                  )
                }
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;