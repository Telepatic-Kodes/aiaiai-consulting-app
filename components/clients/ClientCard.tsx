import React from 'react'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'
import { User, Mail, Building, DollarSign, MoreVertical, Edit, Trash2, Eye } from 'lucide-react'
import { Client } from '@/types'

interface ClientCardProps {
  client: Client
  onEdit?: (client: Client) => void
  onDelete?: (client: Client) => void
  onView?: (client: Client) => void
}

/**
 * Professional Client Card Component
 * 
 * Features:
 * - Clean, minimal design
 * - Client information display
 * - Action buttons
 * - Status indicators
 * - Revenue display
 */
export const ClientCard: React.FC<ClientCardProps> = ({
  client,
  onEdit,
  onDelete,
  onView
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'prospect':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  const totalRevenue = client.projects.reduce((sum, project) => sum + project.budget, 0)
  const activeProjects = client.projects.filter(p => p.status === 'active').length
  
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardBody>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary-900">{client.name}</h3>
              <p className="text-sm text-primary-600">{client.company}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
              {client.status}
            </span>
            
            <div className="relative">
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
              
              {/* Dropdown menu would go here */}
            </div>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2 text-sm text-primary-600">
            <Mail className="h-4 w-4" />
            <span>{client.email}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-primary-600">
            <Building className="h-4 w-4" />
            <span>{client.industry}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-primary-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <DollarSign className="h-4 w-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-600">Revenue</span>
            </div>
            <p className="text-lg font-bold text-primary-900">
              {formatCurrency(totalRevenue)}
            </p>
          </div>
          
          <div className="text-center p-3 bg-primary-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Building className="h-4 w-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-600">Projects</span>
            </div>
            <p className="text-lg font-bold text-primary-900">
              {activeProjects} active
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-primary-200">
          <div className="text-xs text-primary-500">
            Joined {new Date(client.createdAt).toLocaleDateString()}
          </div>
          
          <div className="flex items-center space-x-2">
            {onView && (
              <Button variant="ghost" size="sm" onClick={() => onView(client)}>
                <Eye className="h-4 w-4" />
              </Button>
            )}
            {onEdit && (
              <Button variant="ghost" size="sm" onClick={() => onEdit(client)}>
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button variant="ghost" size="sm" onClick={() => onDelete(client)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

