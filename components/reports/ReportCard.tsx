import React from 'react'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Report } from '@/types'
import { 
  FileText, 
  Download, 
  Share, 
  Calendar, 
  User,
  TrendingUp,
  DollarSign,
  Users,
  FolderOpen
} from 'lucide-react'

interface ReportCardProps {
  report: Report
  onDownload?: (report: Report) => void
  onShare?: (report: Report) => void
  onView?: (report: Report) => void
}

/**
 * Professional Report Card Component
 * 
 * Features:
 * - Clean, minimal design
 * - Report information display
 * - Action buttons
 * - Type indicators
 * - Professional styling
 */
export const ReportCard: React.FC<ReportCardProps> = ({
  report,
  onDownload,
  onShare,
  onView
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'financial':
        return <DollarSign className="h-5 w-5 text-green-600" />
      case 'project':
        return <FolderOpen className="h-5 w-5 text-blue-600" />
      case 'client':
        return <Users className="h-5 w-5 text-purple-600" />
      case 'team':
        return <Users className="h-5 w-5 text-orange-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'financial':
        return 'bg-green-100 text-green-800'
      case 'project':
        return 'bg-blue-100 text-blue-800'
      case 'client':
        return 'bg-purple-100 text-purple-800'
      case 'team':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {getTypeIcon(report.type)}
            <div>
              <h3 className="text-lg font-semibold text-primary-900">{report.title}</h3>
              <p className="text-sm text-primary-600">{report.description}</p>
            </div>
          </div>
          
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
            {report.type}
          </span>
        </div>
      </CardHeader>
      
      <CardBody>
        <div className="space-y-4">
          {/* Report Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-sm text-primary-600">
              <Calendar className="h-4 w-4" />
              <span>Generated: {formatDate(report.generatedAt)}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-primary-600">
              <User className="h-4 w-4" />
              <span>By: {report.generatedBy}</span>
            </div>
          </div>
          
          {/* Filters Applied */}
          {report.filters && (
            <div className="p-3 bg-primary-50 rounded-lg">
              <p className="text-xs font-medium text-primary-700 mb-2">Filters Applied:</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-white text-primary-600 border border-primary-200">
                  {new Date(report.filters.dateRange.start).toLocaleDateString()} - {new Date(report.filters.dateRange.end).toLocaleDateString()}
                </span>
                {report.filters.clients && report.filters.clients.length > 0 && (
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-white text-primary-600 border border-primary-200">
                    {report.filters.clients.length} clients
                  </span>
                )}
                {report.filters.projects && report.filters.projects.length > 0 && (
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-white text-primary-600 border border-primary-200">
                    {report.filters.projects.length} projects
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-primary-200">
            <div className="text-xs text-primary-500">
              Report ID: {report.id.slice(0, 8)}...
            </div>
            
            <div className="flex items-center space-x-2">
              {onView && (
                <Button variant="ghost" size="sm" onClick={() => onView(report)}>
                  <FileText className="h-4 w-4" />
                </Button>
              )}
              {onShare && (
                <Button variant="ghost" size="sm" onClick={() => onShare(report)}>
                  <Share className="h-4 w-4" />
                </Button>
              )}
              {onDownload && (
                <Button variant="ghost" size="sm" onClick={() => onDownload(report)}>
                  <Download className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
