import React, { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Client, ClientFormData } from '@/types'
import { X } from 'lucide-react'

interface ClientFormProps {
  client?: Client
  onSubmit: (data: ClientFormData) => void
  onCancel: () => void
  loading?: boolean
}

/**
 * Professional Client Form Component
 * 
 * Features:
 * - Clean, minimal design
 * - Form validation
 * - Loading states
 * - Professional styling
 * - Responsive layout
 */
export const ClientForm: React.FC<ClientFormProps> = ({
  client,
  onSubmit,
  onCancel,
  loading = false
}) => {
  const [formData, setFormData] = useState<ClientFormData>({
    name: client?.name || '',
    email: client?.email || '',
    company: client?.company || '',
    industry: client?.industry || '',
    status: client?.status || 'prospect'
  })
  
  const [errors, setErrors] = useState<Partial<ClientFormData>>({})
  
  const handleInputChange = (field: keyof ClientFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }
  
  const validateForm = (): boolean => {
    const newErrors: Partial<ClientFormData> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required'
    }
    
    if (!formData.industry.trim()) {
      newErrors.industry = 'Industry is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-primary-900">
              {client ? 'Edit Client' : 'Add New Client'}
            </h2>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardBody className="space-y-4">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={errors.name}
              placeholder="Enter client's full name"
              required
            />
            
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              placeholder="Enter email address"
              required
            />
            
            <Input
              label="Company"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              error={errors.company}
              placeholder="Enter company name"
              required
            />
            
            <Input
              label="Industry"
              value={formData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              error={errors.industry}
              placeholder="Enter industry"
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value as any)}
                className="block w-full rounded-lg border border-primary-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              >
                <option value="prospect">Prospect</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
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
                {client ? 'Update Client' : 'Add Client'}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

