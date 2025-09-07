import React from 'react'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Milestone } from '@/types'
import { CheckCircle, Clock, AlertCircle, Calendar } from 'lucide-react'

interface ProjectTimelineProps {
  milestones: Milestone[]
  projectTitle: string
}

/**
 * Professional Project Timeline Component
 * 
 * Features:
 * - Clean timeline design
 * - Milestone tracking
 * - Status indicators
 * - Progress visualization
 * - Professional styling
 */
export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({
  milestones,
  projectTitle
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600" />
      case 'overdue':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  const isOverdue = (dueDate: Date) => {
    return new Date(dueDate) < new Date()
  }
  
  const completedMilestones = milestones.filter(m => m.status === 'completed').length
  const totalMilestones = milestones.length
  const progressPercentage = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary-900">Project Timeline</h3>
          <div className="text-sm text-primary-600">
            {completedMilestones} of {totalMilestones} completed
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-primary-600">Overall Progress</span>
            <span className="text-primary-900 font-medium">{progressPercentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-primary-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardBody>
        <div className="space-y-6">
          {milestones.map((milestone, index) => {
            const overdue = isOverdue(milestone.dueDate) && milestone.status !== 'completed'
            const currentStatus = overdue ? 'overdue' : milestone.status
            
            return (
              <div key={milestone.id} className="relative">
                {/* Timeline Line */}
                {index < milestones.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-primary-200" />
                )}
                
                <div className="flex items-start space-x-4">
                  {/* Status Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(currentStatus)}
                  </div>
                  
                  {/* Milestone Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base font-medium text-primary-900">
                        {milestone.title}
                      </h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(currentStatus)}`}>
                        {currentStatus}
                      </span>
                    </div>
                    
                    <p className="text-sm text-primary-600 mb-3">
                      {milestone.description}
                    </p>
                    
                    {/* Due Date */}
                    <div className="flex items-center space-x-2 text-sm text-primary-500 mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Due: {new Date(milestone.dueDate).toLocaleDateString()}
                      </span>
                      {milestone.completedDate && (
                        <span className="text-green-600">
                          • Completed: {new Date(milestone.completedDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    
                    {/* Deliverables */}
                    {milestone.deliverables.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-medium text-primary-700 mb-2">Deliverables:</p>
                        <ul className="space-y-1">
                          {milestone.deliverables.map((deliverable, idx) => (
                            <li key={idx} className="text-xs text-primary-600 flex items-center space-x-2">
                              <div className="w-1 h-1 bg-primary-400 rounded-full" />
                              <span>{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {milestones.length === 0 && (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-primary-300 mx-auto mb-4" />
            <p className="text-primary-600">No milestones defined for this project</p>
            <p className="text-primary-500 text-sm mt-1">Add milestones to track project progress</p>
          </div>
        )}
      </CardBody>
    </Card>
  )
}
