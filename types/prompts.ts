// Tipos para el sistema de gestión de prompts de consultoría
export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  category: 'meeting' | 'analysis' | 'proposal' | 'benchmark' | 'commercial';
  step: number;
  template: string;
  variables: PromptVariable[];
  examples: PromptExample[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PromptVariable {
  name: string;
  type: 'text' | 'number' | 'date' | 'list' | 'boolean';
  description: string;
  required: boolean;
  defaultValue?: string;
  options?: string[]; // Para tipo 'list'
}

export interface PromptExample {
  id: string;
  title: string;
  input: Record<string, any>;
  output: string;
  description: string;
}

export interface PromptExecution {
  id: string;
  templateId: string;
  clientId: string;
  variables: Record<string, any>;
  prompt: string;
  response?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  metadata?: {
    tokensUsed?: number;
    processingTime?: number;
    model?: string;
  };
}

export interface PromptCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  steps: number[];
}

export const PROMPT_CATEGORIES: PromptCategory[] = [
  {
    id: 'meeting',
    name: 'Reunión',
    description: 'Prompts para agendamiento y transcripción de reuniones',
    icon: '🎥',
    color: 'blue',
    steps: [1, 2]
  },
  {
    id: 'analysis',
    name: 'Análisis',
    description: 'Prompts para análisis de reuniones y generación de insights',
    icon: '🧠',
    color: 'green',
    steps: [3]
  },
  {
    id: 'proposal',
    name: 'Propuesta Técnica',
    description: 'Prompts para generación de propuestas técnicas',
    icon: '📋',
    color: 'yellow',
    steps: [4]
  },
  {
    id: 'benchmark',
    name: 'Benchmark',
    description: 'Prompts para investigación de mercado y competencia',
    icon: '📊',
    color: 'purple',
    steps: [5]
  },
  {
    id: 'commercial',
    name: 'Propuesta Comercial',
    description: 'Prompts para propuestas comerciales finales',
    icon: '💰',
    color: 'red',
    steps: [6]
  }
];
