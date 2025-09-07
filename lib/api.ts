/**
 * API Client Library
 * 
 * Features:
 * - Centralized API calls
 * - Error handling
 * - Type safety
 * - Authentication headers
 * - Request/response interceptors
 */

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

interface ApiError {
  message: string;
  status: number;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
    this.token = this.getToken();
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (this.token) {
        headers.Authorization = `Bearer ${this.token}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(data.error || 'Error en la petición', response.status);
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('API request error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  // Authentication
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    password: string;
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Agents
  async getAgents() {
    return this.request('/agents');
  }

  async createAgent(agentData: {
    name: string;
    description: string;
    category: string;
    configuration?: any;
  }) {
    return this.request('/agents', {
      method: 'POST',
      body: JSON.stringify(agentData),
    });
  }

  // Clients
  async getClients() {
    return this.request('/clients');
  }

  async createClient(clientData: {
    companyName: string;
    contactName: string;
    email: string;
    phone?: string;
    industry?: string;
    companySize?: string;
    website?: string;
    address?: string;
    description?: string;
  }) {
    return this.request('/clients', {
      method: 'POST',
      body: JSON.stringify(clientData),
    });
  }

  // Projects
  async getProjects() {
    return this.request('/projects');
  }

  async createProject(projectData: {
    projectName: string;
    client: string;
    description?: string;
    startDate: string;
    endDate: string;
    budget?: string;
    teamSize?: string;
    priority?: string;
    status?: string;
  }) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  // Reports
  async getReports() {
    return this.request('/reports');
  }

  async createReport(reportData: {
    reportName: string;
    reportType: string;
    dateRange?: string;
    dataSource?: string;
    format?: string;
    includeCharts?: boolean;
    includeDetails?: boolean;
    emailRecipients?: string;
  }) {
    return this.request('/reports', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  }

  // Analytics
  async getAnalytics() {
    return this.request('/analytics');
  }

  // Dashboard
  async getDashboard() {
    return this.request('/dashboard');
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export types
export type { ApiResponse, ApiError };


