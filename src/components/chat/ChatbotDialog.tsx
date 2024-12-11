import { Dialog, DialogContent } from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar } from "../ui/avatar";
import { Sparkles } from "lucide-react";

interface ChatbotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Message {
  type: "bot" | "user";
  content: string | string[];
  options?: Option[];
}

interface Option {
  label: string;
  value: string;
  action: () => void;
}

const ChatbotDialog = ({ open, onOpenChange }: ChatbotDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content: [
        "Olá! Eu sou a Ana, assistente virtual da Agrega AI! 👋",
        "Estou aqui para ajudar você a encontrar a solução ideal para o seu negócio.",
      ],
      options: [
        {
          label: "Quero conhecer os planos",
          value: "plans",
          action: () => handlePlansFlow(),
        },
        {
          label: "Tenho dúvidas sobre as soluções",
          value: "solutions",
          action: () => handleSolutionsFlow(),
        },
        {
          label: "Preciso de ajuda com integrações",
          value: "integrations",
          action: () => handleIntegrationsFlow(),
        },
      ],
    },
  ]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const handlePlansFlow = () => {
    addMessage({
      type: "user",
      content: "Quero conhecer os planos",
    });
    addMessage({
      type: "bot",
      content: "Ótimo! Para recomendar o melhor plano, preciso entender um pouco sobre seu negócio.",
      options: [
        {
          label: "Sou uma pequena empresa",
          value: "small",
          action: () => recommendStarterPlan(),
        },
        {
          label: "Empresa de médio porte",
          value: "medium",
          action: () => recommendProPlan(),
        },
        {
          label: "Grande empresa",
          value: "large",
          action: () => recommendCustomPlan(),
        },
      ],
    });
  };

  const handleSolutionsFlow = () => {
    addMessage({
      type: "user",
      content: "Tenho dúvidas sobre as soluções",
    });
    addMessage({
      type: "bot",
      content: "Que tipo de solução você procura?",
      options: [
        {
          label: "B2B",
          value: "b2b",
          action: () => showSolutionInfo("b2b"),
        },
        {
          label: "B2C",
          value: "b2c",
          action: () => showSolutionInfo("b2c"),
        },
        {
          label: "D2C",
          value: "d2c",
          action: () => showSolutionInfo("d2c"),
        },
        {
          label: "Marketplace",
          value: "marketplace",
          action: () => showSolutionInfo("marketplace"),
        },
      ],
    });
  };

  const handleIntegrationsFlow = () => {
    addMessage({
      type: "user",
      content: "Preciso de ajuda com integrações",
    });
    addMessage({
      type: "bot",
      content: "Entendi! Nossas soluções possuem diversas integrações nativas. Com qual sistema você precisa integrar?",
      options: [
        {
          label: "ERP",
          value: "erp",
          action: () => showIntegrationInfo("erp"),
        },
        {
          label: "Marketplace",
          value: "marketplace",
          action: () => showIntegrationInfo("marketplace"),
        },
        {
          label: "Logística",
          value: "logistics",
          action: () => showIntegrationInfo("logistics"),
        },
        {
          label: "Pagamentos",
          value: "payments",
          action: () => showIntegrationInfo("payments"),
        },
      ],
    });
  };

  const recommendStarterPlan = () => {
    addMessage({
      type: "user",
      content: "Sou uma pequena empresa",
    });
    addMessage({
      type: "bot",
      content: [
        "Baseado no seu perfil, recomendo o Plano Starter!",
        "É perfeito para pequenas empresas que estão começando no e-commerce.",
        "Vou chamar um especialista para te apresentar todos os detalhes e benefícios.",
      ],
    });
    setTimeout(() => {
      addMessage({
        type: "bot",
        content: "Um de nossos consultores entrará em contato em breve! 🎉",
      });
    }, 1000);
  };

  const recommendProPlan = () => {
    addMessage({
      type: "user",
      content: "Empresa de médio porte",
    });
    addMessage({
      type: "bot",
      content: [
        "Para empresas de médio porte, nosso Plano Pro é a escolha ideal!",
        "Ele oferece mais recursos e suporte prioritário para escalar seu negócio.",
        "Vou chamar um especialista para detalhar todas as vantagens.",
      ],
    });
    setTimeout(() => {
      addMessage({
        type: "bot",
        content: "Um de nossos consultores entrará em contato em breve! 🎉",
      });
    }, 1000);
  };

  const recommendCustomPlan = () => {
    addMessage({
      type: "user",
      content: "Grande empresa",
    });
    addMessage({
      type: "bot",
      content: [
        "Para grandes operações, recomendo nosso Plano Custom!",
        "É uma solução personalizada com recursos avançados e suporte dedicado.",
        "Vou conectar você com um especialista para criar uma solução sob medida.",
      ],
    });
    setTimeout(() => {
      addMessage({
        type: "bot",
        content: "Um de nossos consultores entrará em contato em breve! 🎉",
      });
    }, 1000);
  };

  const showSolutionInfo = (solution: string) => {
    const solutionInfo: Record<string, string[]> = {
      b2b: [
        "Nossa solução B2B é ideal para empresas que vendem para outras empresas.",
        "Oferecemos recursos como:",
        "• Múltiplos perfis de comprador",
        "• Aprovação em níveis",
        "• Condições comerciais personalizadas",
      ],
      b2c: [
        "Nossa solução B2C é perfeita para vender diretamente ao consumidor final.",
        "Principais recursos:",
        "• Checkout otimizado",
        "• Recomendações inteligentes",
        "• Gestão de campanhas",
      ],
      d2c: [
        "Com nossa solução D2C, sua marca vende diretamente ao consumidor.",
        "Destaques:",
        "• Experiência de marca personalizada",
        "• Gestão de relacionamento",
        "• Analytics avançado",
      ],
      marketplace: [
        "Nossa solução de Marketplace permite criar seu próprio ecossistema de vendas.",
        "Recursos principais:",
        "• Gestão de sellers",
        "• Split de pagamentos",
        "• Dashboard para vendedores",
      ],
    };

    addMessage({
      type: "user",
      content: solution.toUpperCase(),
    });
    addMessage({
      type: "bot",
      content: solutionInfo[solution],
      options: [
        {
          label: "Falar com especialista",
          value: "contact",
          action: () => requestContact(),
        },
        {
          label: "Ver preços",
          value: "pricing",
          action: () => handlePlansFlow(),
        },
      ],
    });
  };

  const showIntegrationInfo = (integration: string) => {
    const integrationInfo: Record<string, string[]> = {
      erp: [
        "Integramos com os principais ERPs do mercado!",
        "• SAP",
        "• Totvs",
        "• Oracle",
        "E muito mais...",
      ],
      marketplace: [
        "Conecte-se com os principais marketplaces:",
        "• Mercado Livre",
        "• Amazon",
        "• Magalu",
        "Entre outros...",
      ],
      logistics: [
        "Integração com as principais transportadoras:",
        "• Correios",
        "• Jadlog",
        "• Total Express",
        "E outras...",
      ],
      payments: [
        "Aceite pagamentos com:",
        "• Cartão de crédito",
        "• Boleto",
        "• Pix",
        "E mais opções...",
      ],
    };

    addMessage({
      type: "user",
      content: integration.toUpperCase(),
    });
    addMessage({
      type: "bot",
      content: integrationInfo[integration],
      options: [
        {
          label: "Falar com especialista",
          value: "contact",
          action: () => requestContact(),
        },
        {
          label: "Ver preços",
          value: "pricing",
          action: () => handlePlansFlow(),
        },
      ],
    });
  };

  const requestContact = () => {
    addMessage({
      type: "user",
      content: "Quero falar com um especialista",
    });
    addMessage({
      type: "bot",
      content: "Ótimo! Um de nossos especialistas entrará em contato em breve para ajudar você! 🎉",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] h-[600px] flex flex-col gap-4">
        <div className="flex items-center gap-2 pb-2 border-b">
          <Avatar className="h-10 w-10 bg-primary">
            <Sparkles className="h-6 w-6 text-white" />
          </Avatar>
          <div>
            <h4 className="text-sm font-semibold">Ana da Agrega AI</h4>
            <p className="text-xs text-muted-foreground">Assistente Virtual</p>
          </div>
        </div>
        
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-primary text-white"
                      : "bg-muted"
                  }`}
                >
                  {Array.isArray(message.content) ? (
                    message.content.map((text, i) => (
                      <p key={i} className="text-sm mb-2 last:mb-0">
                        {text}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                  {message.options && (
                    <div className="flex flex-col gap-2 mt-3">
                      {message.options.map((option) => (
                        <Button
                          key={option.value}
                          variant="secondary"
                          className="w-full justify-start text-left"
                          onClick={option.action}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotDialog;