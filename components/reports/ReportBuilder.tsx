import React, { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ReportFilters } from '@/types'
import { X, Calendar, Users, FolderOpen, Filter } from 'lucide-react'

interface ReportBuilderProps {
  onGenerate: (filters: ReportFilters, title: string, description: string) => void
  onCancel: () => void
  loading?: boolean
}

/**
 * Professional Report Builder Component
 * 
 * Features:
 * - Clean, minimal design
 * - Filter configuration
 * - Date range selection
 * - Professional styling
 * - Form validation
 */
export const ReportBuilder: React.FC<ReportBuilderProps> = ({
  onGenerate,
  onCancel,
  loading = false
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [filters, setFilters] = useState<ReportFilters>({
    dateRange: {
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      end: new Date()
    },
    clients: [],
    projects: [],
    teamMembers: [],
    status: []
  })
  
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  
  const handleDateChange = (field: 'start' | 'end', value: string) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: new Date(value)
      }
    }))
  }
  
  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {}
    
    if (!title.trim()) {
      newErrors.title = 'Report title is required'
    }
    
    if (!description.trim()) {
      newErrors.description = 'Report description is required'
    }
    
    if (filters.dateRange.start > filters.dateRange.end) {
      newErrors.dateRange = 'Start date must be before end date'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onGenerate(filters, title, description)
    }
  }
  
  const presetRanges = [
    {
      label: 'Last 7 days',
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      end: new Date()
    },
    {
      label: 'Last 30 days',
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      end: new Date()
    },
    {
      label: 'This month',
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      end: new Date()
    },
    {
      label: 'Last month',
      start: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      end: new Date(new Date().getFullYear(), new Date().getMonth(), 0)
    },
    {
      label: 'This quarter',
      start: new Date(new Date().getFullYear(), Math.floor(new Date().getMonth() / 3) * 3, 1),
      end: new Date()
    }
  ]
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-primary-900">Generate Report</h2>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardBody className="space-y-6">
            {/* Report Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-primary-900">Report Details</h3>
              
              <Input
                label="Report Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={errors.title}
                placeholder="Enter report title"
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-lg border border-primary-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                  rows={3}
                  placeholder="Enter report description"
                  required
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
            </div>
            
            {/* Date Range */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-primary-900">Date Range</h3>
              
              {/* Preset Ranges */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {presetRanges.map((preset, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setFilters(prev => ({
                        ...prev,
                        dateRange: {
                          start: preset.start,
                          end: preset.end
                        }
                      }))
                    }}
                    className="text-xs"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
              
              {/* Custom Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={filters.dateRange.start.toISOString().split('T')[0]}
                    onChange={(e) => handleDateChange('start', e.target.value)}
                    className="block w-full rounded-lg border border-primary-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={filters.dateRange.end.toISOString().split('T')[0]}
                    onChange={(e) => handleDateChange('end', e.target.value)}
                    className="block w-full rounded-lg border border-primary-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                  />
                </div>
              </div>
              
              {errors.dateRange && (
                <p className="text-sm text-red-600">{errors.dateRange}</p>
              )}
            </div>
            
            {/* Additional Filters */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-primary-900">Additional Filters</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-1">
                    Project Status
                  </label>
                  <select
                    multiple
                    className="block w-full rounded-lg border border-primary-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="planning">Planning</option>
                    <option value="on-hold">On Hold</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-1">
                    Client Status
                  </label>
                  <select
                    multiple
                    className="block w-full rounded-lg border border-primary-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="prospect">Prospect</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </CardBody>
          
          <CardFooter>
            <div className="flex items-center justify-end space-x-3 w-full">
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading}
              >
                Generate Report
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
