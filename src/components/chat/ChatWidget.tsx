import { useState, useRef, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";
import { Message, UserProfile, BusinessModel, BusinessSize } from "./types";
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

  const handleRedirect = (value: string) => {
    switch (value) {
      case "view_solution":
        const businessModel = userProfile.businessModel?.toLowerCase();
        if (businessModel) {
          navigate(`/${businessModel}`);
          setIsOpen(false);
        }
        break;
      case "help_center":
        navigate("/area-cliente");
        setIsOpen(false);
        break;
      case "compare_plans":
        navigate("/planos");
        setIsOpen(false);
        break;
      case "price_simulator":
        navigate("/calculadora");
        setIsOpen(false);
        break;
      case "live_chat":
      case "whatsapp":
        toast({
          title: "Iniciando chat",
          description: "Um de nossos atendentes entrará em contato em instantes.",
        });
        setIsOpen(false);
        break;
      case "email":
      case "email_support":
        toast({
          title: "Solicitação recebida",
          description: "Você receberá um email em breve com mais informações.",
        });
        setIsOpen(false);
        break;
      case "phone":
      case "phone_call":
        toast({
          title: "Agendamento de ligação",
          description: "Nossa equipe entrará em contato no próximo horário comercial.",
        });
        setIsOpen(false);
        break;
      default:
        console.log("Ação não mapeada:", value);
    }
  };

  const handleOptionSelect = (value: string, nextQuestion?: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "user",
        content: prev[prev.length - 1].options?.find((o) => o.value === value)?.label || value,
      },
    ]);

    if (["B2C", "B2B", "D2C", "Marketplace"].includes(value)) {
      setUserProfile((prev) => ({ 
        ...prev, 
        businessModel: value as BusinessModel 
      }));
    } else if (["small", "medium", "large"].includes(value)) {
      setUserProfile((prev) => ({ 
        ...prev, 
        businessSize: value as BusinessSize 
      }));
    }

    if (["view_solution", "help_center", "compare_plans", "price_simulator", "live_chat", "whatsapp", "email", "email_support", "phone", "phone_call"].includes(value)) {
      handleRedirect(value);
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