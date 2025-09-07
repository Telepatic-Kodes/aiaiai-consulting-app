/**
 * AIAIAI Consulting - API Backend Simulation
 * Simulación de API backend para la aplicación
 */

class APIManager {
    constructor() {
        this.baseURL = 'http://localhost:8000/api';
        this.token = null;
        this.init();
    }

    init() {
        // Load token from localStorage
        this.token = localStorage.getItem('token');
    }

    // Generic request method
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(this.token && { 'Authorization': `Bearer ${this.token}` })
            },
            ...options
        };

        // Simulate API delay
        await this.delay(500 + Math.random() * 1000);

        // Simulate API response
        return this.simulateAPIResponse(endpoint, options);
    }

    // Simulate network delay
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Simulate API responses
    simulateAPIResponse(endpoint, options) {
        const method = options.method || 'GET';
        
        // Agents endpoints
        if (endpoint === '/agents') {
            return {
                success: true,
                data: [
                    {
                        id: 'lead-scorer',
                        name: 'Lead Scorer',
                        status: 'active',
                        precision: 85,
                        tasksProcessed: 1247,
                        timeSaved: 20,
                        price: 49
                    },
                    {
                        id: 'proposal-builder',
                        name: 'Proposal Builder',
                        status: 'active',
                        precision: 95,
                        tasksProcessed: 89,
                        timeSaved: 40,
                        price: 79
                    },
                    {
                        id: 'meeting-summarizer',
                        name: 'Meeting Summarizer',
                        status: 'active',
                        precision: 88,
                        tasksProcessed: 156,
                        timeSaved: 15,
                        price: 39
                    },
                    {
                        id: 'crm-updater',
                        name: 'CRM Updater',
                        status: 'beta',
                        precision: 92,
                        tasksProcessed: 2341,
                        timeSaved: 25,
                        price: 59
                    },
                    {
                        id: 'followup-scheduler',
                        name: 'Follow-up Scheduler',
                        status: 'development',
                        precision: 0,
                        tasksProcessed: 0,
                        timeSaved: 0,
                        price: 49
                    },
                    {
                        id: 'invoice-generator',
                        name: 'Invoice Generator',
                        status: 'development',
                        precision: 0,
                        tasksProcessed: 0,
                        timeSaved: 0,
                        price: 39
                    }
                ]
            };
        }

        // Clients endpoints
        if (endpoint === '/clients') {
            return {
                success: true,
                data: [
                    {
                        id: 1,
                        name: "María González",
                        email: "maria@techcorp.cl",
                        company: "TechCorp Chile",
                        phone: "+56 9 1234 5678",
                        role: "CTO",
                        industry: "technology",
                        size: "medium",
                        status: "active",
                        revenue: 25000,
                        projects: 3,
                        satisfaction: 4.8,
                        lastContact: "2025-01-05",
                        notes: "Cliente muy satisfecho con los agentes implementados"
                    },
                    {
                        id: 2,
                        name: "Carlos Rodríguez",
                        email: "carlos@innovate.cl",
                        company: "Innovate Solutions",
                        phone: "+56 9 2345 6789",
                        role: "CEO",
                        industry: "technology",
                        size: "small",
                        status: "active",
                        revenue: 15000,
                        projects: 2,
                        satisfaction: 4.6,
                        lastContact: "2025-01-04",
                        notes: "Interesado en expandir el uso de agentes"
                    },
                    {
                        id: 3,
                        name: "Ana Silva",
                        email: "ana@retailmax.cl",
                        company: "RetailMax",
                        phone: "+56 9 3456 7890",
                        role: "Gerente General",
                        industry: "retail",
                        size: "large",
                        status: "active",
                        revenue: 45000,
                        projects: 5,
                        satisfaction: 4.9,
                        lastContact: "2025-01-06",
                        notes: "Cliente premium, muy comprometido con la automatización"
                    },
                    {
                        id: 4,
                        name: "Roberto Martínez",
                        email: "roberto@startup.cl",
                        company: "StartupLatam",
                        phone: "+56 9 4567 8901",
                        role: "Fundador",
                        industry: "technology",
                        size: "startup",
                        status: "prospect",
                        revenue: 0,
                        projects: 0,
                        satisfaction: 0,
                        lastContact: "2025-01-03",
                        notes: "Prospecto interesado en Lead Scorer"
                    },
                    {
                        id: 5,
                        name: "Laura Fernández",
                        email: "laura@finance.cl",
                        company: "FinancePro",
                        phone: "+56 9 5678 9012",
                        role: "Directora de Operaciones",
                        industry: "finance",
                        size: "medium",
                        status: "active",
                        revenue: 32000,
                        projects: 4,
                        satisfaction: 4.7,
                        lastContact: "2025-01-05",
                        notes: "Excelente relación comercial"
                    },
                    {
                        id: 6,
                        name: "Diego Herrera",
                        email: "diego@healthcare.cl",
                        company: "HealthTech",
                        phone: "+56 9 6789 0123",
                        role: "Director de TI",
                        industry: "healthcare",
                        size: "large",
                        status: "prospect",
                        revenue: 0,
                        projects: 0,
                        satisfaction: 0,
                        lastContact: "2025-01-02",
                        notes: "Evaluando propuesta para Meeting Summarizer"
                    }
                ]
            };
        }

        // Projects endpoints
        if (endpoint === '/projects') {
            return {
                success: true,
                data: [
                    {
                        id: 1,
                        name: "Implementación Lead Scorer",
                        client: "TechCorp Chile",
                        clientId: 1,
                        status: "active",
                        priority: "high",
                        startDate: "2025-01-01",
                        endDate: "2025-02-15",
                        budget: 25000,
                        progress: 75,
                        description: "Implementación completa del agente Lead Scorer para automatizar la calificación de leads",
                        agents: ["lead-scorer"],
                        milestones: [
                            { name: "Análisis de procesos", date: "2025-01-05", completed: true },
                            { name: "Configuración inicial", date: "2025-01-15", completed: true },
                            { name: "Pruebas beta", date: "2025-01-25", completed: true },
                            { name: "Implementación final", date: "2025-02-10", completed: false },
                            { name: "Capacitación", date: "2025-02-15", completed: false }
                        ]
                    },
                    {
                        id: 2,
                        name: "Automatización de Propuestas",
                        client: "Innovate Solutions",
                        clientId: 2,
                        status: "active",
                        priority: "medium",
                        startDate: "2025-01-10",
                        endDate: "2025-03-01",
                        budget: 15000,
                        progress: 45,
                        description: "Implementación del Proposal Builder para automatizar la generación de propuestas comerciales",
                        agents: ["proposal-builder", "meeting-summarizer"],
                        milestones: [
                            { name: "Reunión de descubrimiento", date: "2025-01-12", completed: true },
                            { name: "Configuración de templates", date: "2025-01-20", completed: true },
                            { name: "Integración con CRM", date: "2025-02-05", completed: false },
                            { name: "Pruebas de usuario", date: "2025-02-20", completed: false },
                            { name: "Go-live", date: "2025-03-01", completed: false }
                        ]
                    },
                    {
                        id: 3,
                        name: "Optimización de Reuniones",
                        client: "RetailMax",
                        clientId: 3,
                        status: "completed",
                        priority: "high",
                        startDate: "2024-12-01",
                        endDate: "2024-12-31",
                        budget: 45000,
                        progress: 100,
                        description: "Implementación completa del Meeting Summarizer para optimizar el seguimiento de reuniones",
                        agents: ["meeting-summarizer", "crm-updater"],
                        milestones: [
                            { name: "Análisis de necesidades", date: "2024-12-05", completed: true },
                            { name: "Configuración del agente", date: "2024-12-10", completed: true },
                            { name: "Integración con calendario", date: "2024-12-15", completed: true },
                            { name: "Capacitación del equipo", date: "2024-12-20", completed: true },
                            { name: "Implementación final", date: "2024-12-31", completed: true }
                        ]
                    },
                    {
                        id: 4,
                        name: "Automatización de CRM",
                        client: "FinancePro",
                        clientId: 5,
                        status: "planning",
                        priority: "medium",
                        startDate: "2025-02-01",
                        endDate: "2025-03-15",
                        budget: 32000,
                        progress: 10,
                        description: "Implementación del CRM Updater para mantener la base de datos siempre actualizada",
                        agents: ["crm-updater", "followup-scheduler"],
                        milestones: [
                            { name: "Análisis de datos actuales", date: "2025-02-05", completed: false },
                            { name: "Configuración de sincronización", date: "2025-02-15", completed: false },
                            { name: "Pruebas de integración", date: "2025-02-25", completed: false },
                            { name: "Migración de datos", date: "2025-03-05", completed: false },
                            { name: "Capacitación y go-live", date: "2025-03-15", completed: false }
                        ]
                    },
                    {
                        id: 5,
                        name: "Sistema de Facturación",
                        client: "HealthTech",
                        clientId: 6,
                        status: "on-hold",
                        priority: "low",
                        startDate: "2025-01-15",
                        endDate: "2025-04-01",
                        budget: 18000,
                        progress: 25,
                        description: "Implementación del Invoice Generator para automatizar la generación de facturas",
                        agents: ["invoice-generator"],
                        milestones: [
                            { name: "Análisis de procesos actuales", date: "2025-01-20", completed: true },
                            { name: "Configuración de templates", date: "2025-02-01", completed: false },
                            { name: "Integración con contabilidad", date: "2025-02-15", completed: false },
                            { name: "Pruebas de facturación", date: "2025-03-01", completed: false },
                            { name: "Implementación final", date: "2025-04-01", completed: false }
                        ]
                    }
                ]
            };
        }

        // Reports endpoints
        if (endpoint === '/reports/metrics') {
            return {
                success: true,
                data: {
                    totalRevenue: 172000,
                    activeClients: 24,
                    activeProjects: 12,
                    teamUtilization: 87,
                    averageSatisfaction: 4.7
                }
            };
        }

        // Auth endpoints
        if (endpoint === '/auth/login' && method === 'POST') {
            const body = JSON.parse(options.body || '{}');
            if (body.email === 'admin@aiaiai-consulting.com' && body.password === 'demo123') {
                return {
                    success: true,
                    data: {
                        user: {
                            id: 1,
                            name: 'Administrador',
                            email: body.email,
                            role: 'admin',
                            avatar: 'A'
                        },
                        token: 'demo-token-' + Date.now()
                    }
                };
            } else {
                return {
                    success: false,
                    error: 'Credenciales inválidas'
                };
            }
        }

        // Default response
        return {
            success: true,
            data: null,
            message: 'API endpoint not implemented'
        };
    }

    // Specific API methods
    async getAgents() {
        return await this.request('/agents');
    }

    async getClients() {
        return await this.request('/clients');
    }

    async getProjects() {
        return await this.request('/projects');
    }

    async getMetrics() {
        return await this.request('/reports/metrics');
    }

    async login(email, password) {
        const response = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        if (response.success) {
            this.token = response.data.token;
            localStorage.setItem('token', this.token);
        }

        return response;
    }

    async logout() {
        this.token = null;
        localStorage.removeItem('token');
        return { success: true };
    }

    // Update methods
    async updateAgent(agentId, config) {
        return await this.request(`/agents/${agentId}`, {
            method: 'PUT',
            body: JSON.stringify(config)
        });
    }

    async createClient(clientData) {
        return await this.request('/clients', {
            method: 'POST',
            body: JSON.stringify(clientData)
        });
    }

    async updateClient(clientId, clientData) {
        return await this.request(`/clients/${clientId}`, {
            method: 'PUT',
            body: JSON.stringify(clientData)
        });
    }

    async createProject(projectData) {
        return await this.request('/projects', {
            method: 'POST',
            body: JSON.stringify(projectData)
        });
    }

    async updateProject(projectId, projectData) {
        return await this.request(`/projects/${projectId}`, {
            method: 'PUT',
            body: JSON.stringify(projectData)
        });
    }
}

// Global API manager instance
window.apiManager = new APIManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APIManager;
}
