// Tipos para el proceso de consultoría
export interface Client {
  id: string;
  name: string;
  company: string;
  industry: string;
  email: string;
  phone: string;
  size: 'startup' | 'pyme' | 'empresa' | 'corporacion';
  budget: {
    min: number;
    max: number;
    currency: 'CLP' | 'USD' | 'EUR';
  };
  timeline: string;
  status: 'prospect' | 'meeting_scheduled' | 'meeting_completed' | 'proposal_sent' | 'negotiating' | 'closed_won' | 'closed_lost';
  createdAt: Date;
  updatedAt: Date;
}

export interface Meeting {
  id: string;
  clientId: string;
  title: string;
  date: Date;
  duration: number; // en minutos
  platform: 'google_meet' | 'zoom' | 'teams' | 'presencial';
  participants: string[];
  transcription?: string;
  minutes?: string;
  insights?: MeetingInsights;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface MeetingInsights {
  id: string;
  meetingId: string;
  needs: string[];
  painPoints: string[];
  objectives: string[];
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  timeline: string;
  technology: string[];
  channels: {
    whatsapp?: number;
    email?: number;
    phone?: number;
    web?: number;
  };
  competitors: string[];
  generatedAt: Date;
}

export interface Proposal {
  id: string;
  clientId: string;
  meetingId: string;
  title: string;
  description: string;
  solution: {
    features: string[];
    benefits: string[];
    timeline: string;
    deliverables: string[];
  };
  pricing: {
    total: number;
    currency: string;
    breakdown: {
      development: number;
      implementation: number;
      training: number;
      support: number;
    };
    paymentOptions: {
      upfront: number;
      milestones: number[];
      monthly: number;
    };
  };
  benchmark: {
    freelancer: {
      min: number;
      max: number;
      average: number;
    };
    agency: {
      min: number;
      max: number;
      average: number;
    };
    competitors: Array<{
      name: string;
      price: number;
      timeline: string;
    }>;
  };
  status: 'draft' | 'sent' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: Date;
  sentAt?: Date;
}

export interface BenchmarkData {
  industry: string;
  freelancer: {
    junior: { min: number; max: number; average: number };
    senior: { min: number; max: number; average: number };
    consultant: { min: number; max: number; average: number };
  };
  agency: {
    small: { min: number; max: number; average: number };
    medium: { min: number; max: number; average: number };
    large: { min: number; max: number; average: number };
  };
  competitors: Array<{
    name: string;
    price: number;
    timeline: string;
    rating: number;
  }>;
}
