/**
 * Core data types for the consulting application
 * Following TypeScript best practices with strict typing
 */

export interface Client {
  id: string
  name: string
  email: string
  company: string
  industry: string
  status: 'active' | 'inactive' | 'prospect'
  createdAt: Date
  updatedAt: Date
  revenue: number
  projects: Project[]
}

export interface Project {
  id: string
  title: string
  description: string
  clientId: string
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'critical'
  startDate: Date
  endDate: Date
  budget: number
  actualCost: number
  progress: number
  team: TeamMember[]
  milestones: Milestone[]
  createdAt: Date
  updatedAt: Date
}

export interface TeamMember {
  id: string
  name: string
  role: string
  email: string
  avatar?: string
  skills: string[]
  hourlyRate: number
  availability: number // percentage
}

export interface Milestone {
  id: string
  title: string
  description: string
  dueDate: Date
  completedDate?: Date
  status: 'pending' | 'in-progress' | 'completed' | 'overdue'
  deliverables: string[]
}

export interface DashboardMetrics {
  totalRevenue: number
  activeProjects: number
  totalClients: number
  teamUtilization: number
  revenueGrowth: number
  projectCompletionRate: number
  averageProjectDuration: number
  clientSatisfaction: number
}

export interface ChartData {
  name: string
  value: number
  color?: string
  [key: string]: any
}

export interface TimeSeriesData {
  date: string
  value: number
  [key: string]: any
}

export interface Report {
  id: string
  title: string
  type: 'financial' | 'project' | 'client' | 'team' | 'custom'
  description: string
  data: any
  generatedAt: Date
  generatedBy: string
  filters: ReportFilters
}

export interface ReportFilters {
  dateRange: {
    start: Date
    end: Date
  }
  clients?: string[]
  projects?: string[]
  teamMembers?: string[]
  status?: string[]
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: Date
  actionUrl?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'consultant' | 'analyst'
  avatar?: string
  permissions: string[]
  lastLogin: Date
}

// API Response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  errors?: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form types
export interface ClientFormData {
  name: string
  email: string
  company: string
  industry: string
  status: 'active' | 'inactive' | 'prospect'
}

export interface ProjectFormData {
  title: string
  description: string
  clientId: string
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'critical'
  startDate: string
  endDate: string
  budget: number
}

// Filter and search types
export interface SearchFilters {
  query?: string
  status?: string[]
  dateRange?: {
    start: Date
    end: Date
  }
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

