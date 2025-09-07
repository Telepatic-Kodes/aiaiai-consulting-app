import React from 'react'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'
import { 
  Calendar, 
  DollarSign, 
  Users, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  Pause
} from 'lucide-react'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  onEdit?: (project: Project) => void
  onDelete?: (project: Project) => void
  onView?: (project: Project) => void
}

/**
 * Professional Project Card Component
 * 
 * Features:
 * - Clean, minimal design
 * - Project information display
 * - Progress tracking
 * - Status indicators
 * - Action buttons
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
  onView
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'planning':
        return 'bg-blue-100 text-blue-800'
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'planning':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'on-hold':
        return <Pause className="h-4 w-4 text-yellow-600" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-gray-600" />
      case 'cancelled':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }
  
  const daysRemaining = Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  const isOverdue = daysRemaining < 0 && project.status !== 'completed'
  
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardBody>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {getStatusIcon(project.status)}
              <h3 className="text-lg font-semibold text-primary-900">{project.title}</h3>
            </div>
            <p className="text-sm text-primary-600 line-clamp-2">{project.description}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
            
            <div className="relative">
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Priority Badge */}
        <div className="mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
            {project.priority} priority
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-primary-600">Progress</span>
            <span className="text-primary-900 font-medium">{project.progress}%</span>
          </div>
          <div className="w-full bg-primary-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
        
        {/* Project Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-primary-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <DollarSign className="h-4 w-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-600">Budget</span>
            </div>
            <p className="text-lg font-bold text-primary-900">
              {formatCurrency(project.budget)}
            </p>
          </div>
          
          <div className="text-center p-3 bg-primary-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Users className="h-4 w-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-600">Team</span>
            </div>
            <p className="text-lg font-bold text-primary-900">
              {project.team.length} members
            </p>
          </div>
        </div>
        
        {/* Timeline */}
        <div className="mb-4 p-3 bg-primary-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-primary-600" />
              <span className="text-primary-600">Timeline</span>
            </div>
            <div className="text-right">
              <p className="text-primary-900 font-medium">
                {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
              </p>
              {isOverdue ? (
                <p className="text-red-600 text-xs">Overdue by {Math.abs(daysRemaining)} days</p>
              ) : (
                <p className="text-primary-500 text-xs">{daysRemaining} days remaining</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-primary-200">
          <div className="text-xs text-primary-500">
            Created {new Date(project.createdAt).toLocaleDateString()}
          </div>
          
          <div className="flex items-center space-x-2">
            {onView && (
              <Button variant="ghost" size="sm" onClick={() => onView(project)}>
                <Eye className="h-4 w-4" />
              </Button>
            )}
            {onEdit && (
              <Button variant="ghost" size="sm" onClick={() => onEdit(project)}>
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button variant="ghost" size="sm" onClick={() => onDelete(project)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
