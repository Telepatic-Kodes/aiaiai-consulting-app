"use client";

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { 
  MessageCircle, 
  Send, 
  X, 
  Minimize2,
  Bot,
  User,
  Clock
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot' | 'system';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

/**
 * Chat Widget Component
 * 
 * Features:
 * - Real-time chat interface
 * - Bot responses
 * - Message history
 * - Typing indicators
 * - Professional design
 */
export function ChatWidget({ isOpen, onToggle, className }: ChatWidgetProps) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: '¡Hola! Soy tu asistente de AIAIAI Consulting. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputValue.trim()),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('agente') || input.includes('agent')) {
      return 'Puedo ayudarte con la gestión de agentes. ¿Te gustaría crear un nuevo agente, ver el estado de los existentes, o necesitas ayuda con alguna configuración específica?';
    }
    
    if (input.includes('cliente') || input.includes('client')) {
      return 'Para la gestión de clientes, puedo ayudarte a agregar nuevos clientes, actualizar información existente, o generar reportes de satisfacción. ¿Qué necesitas hacer?';
    }
    
    if (input.includes('proyecto') || input.includes('project')) {
      return 'Los proyectos son fundamentales para el seguimiento del trabajo. Puedo ayudarte a crear nuevos proyectos, actualizar el progreso, o generar reportes de estado. ¿En qué proyecto trabajas?';
    }
    
    if (input.includes('reporte') || input.includes('report')) {
      return 'Los reportes te ayudan a tomar decisiones basadas en datos. Puedo ayudarte a generar reportes de rendimiento, análisis financiero, o reportes de satisfacción de clientes. ¿Qué tipo de reporte necesitas?';
    }
    
    if (input.includes('ayuda') || input.includes('help')) {
      return 'Estoy aquí para ayudarte con cualquier aspecto de la plataforma AIAIAI Consulting. Puedo asistirte con agentes, clientes, proyectos, reportes, o cualquier otra funcionalidad. ¿Qué te gustaría saber?';
    }
    
    if (input.includes('precio') || input.includes('price') || input.includes('costo')) {
      return 'Los precios de nuestros agentes varían según el tipo y funcionalidad. El Meeting Summarizer cuesta $39/mes, el Proposal Builder $79/mes, y el Lead Scorer $49/mes. ¿Te gustaría conocer más detalles sobre algún agente específico?';
    }
    
    return 'Gracias por tu mensaje. Estoy aquí para ayudarte con cualquier consulta sobre AIAIAI Consulting. ¿Hay algo específico en lo que pueda asistirte?';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-CL', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className={cn(
          'fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50',
          'bg-primary-600 hover:bg-primary-700 text-white',
          className
        )}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={cn(
      'fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50 flex flex-col',
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
            <Bot className="h-4 w-4 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Asistente AIAIAI</h3>
            <p className="text-xs text-green-600">En línea</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex',
                message.type === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-xs px-3 py-2 rounded-lg',
                  message.type === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                )}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'bot' && (
                    <Bot className="h-4 w-4 mt-0.5 text-primary-600 flex-shrink-0" />
                  )}
                  {message.type === 'user' && (
                    <User className="h-4 w-4 mt-0.5 text-white flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{message.content}</p>
                    <p className={cn(
                      'text-xs mt-1',
                      message.type === 'user' ? 'text-primary-100' : 'text-gray-500'
                    )}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 max-w-xs px-3 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-primary-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
