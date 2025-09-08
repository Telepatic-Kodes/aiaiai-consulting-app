"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ContentLayout } from '@/components/layout/ContentLayout';
import { StandardMetricCard } from '@/components/dashboard/StandardMetricCard';
import { 
  Brain, 
  Plus, 
  Edit, 
  Trash2, 
  Play, 
  Copy,
  Save,
  Eye,
  Settings,
  FileText,
  Calendar,
  Search,
  BarChart3,
  DollarSign,
  Target
} from 'lucide-react';
import { PromptTemplate, PROMPT_CATEGORIES } from '@/types/prompts';
import { PROMPT_TEMPLATES } from '@/lib/prompt-templates';

export function PromptManager() {
  const [templates, setTemplates] = useState<PromptTemplate[]>(PROMPT_TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [showPromptExecutor, setShowPromptExecutor] = useState(false);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryInfo = (categoryId: string) => {
    return PROMPT_CATEGORIES.find(cat => cat.id === categoryId);
  };

  const getCategoryColor = (categoryId: string) => {
    const category = getCategoryInfo(categoryId);
    switch (category?.color) {
      case 'blue': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'green': return 'bg-green-100 text-green-800 border-green-200';
      case 'yellow': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'purple': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'red': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const executePrompt = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    setShowPromptExecutor(true);
  };

  const duplicateTemplate = (template: PromptTemplate) => {
    const newTemplate: PromptTemplate = {
      ...template,
      id: `template-${Date.now()}`,
      name: `${template.name} (Copia)`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTemplates(prev => [newTemplate, ...prev]);
  };

  const deleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  return (
    <ContentLayout 
      title="Gestión de Prompts" 
      subtitle="Administra los templates de prompts para el proceso de consultoría"
      actions={
        <Button onClick={() => setShowTemplateEditor(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Template
        </Button>
      }
    >
      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StandardMetricCard
          title="Templates Activos"
          value={templates.filter(t => t.isActive).length}
          icon={Brain}
          color="blue"
          change={`${templates.length} total`}
          changeType="neutral"
        />
        <StandardMetricCard
          title="Categorías"
          value={PROMPT_CATEGORIES.length}
          icon={Target}
          color="green"
          change="6 pasos del proceso"
          changeType="neutral"
        />
        <StandardMetricCard
          title="Variables Totales"
          value={templates.reduce((sum, t) => sum + t.variables.length, 0)}
          icon={Settings}
          color="purple"
          change="Promedio por template"
          changeType="neutral"
        />
        <StandardMetricCard
          title="Ejemplos"
          value={templates.reduce((sum, t) => sum + t.examples.length, 0)}
          icon={FileText}
          color="yellow"
          change="Casos de uso"
          changeType="neutral"
        />
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">Todas las categorías</option>
              {PROMPT_CATEGORIES.map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Categorías */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {PROMPT_CATEGORIES.map(category => {
          const categoryTemplates = templates.filter(t => t.category === category.id);
          return (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{category.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {categoryTemplates.length} templates
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Lista de Templates */}
      <div className="grid gap-6">
        {filteredTemplates.map((template) => {
          const category = getCategoryInfo(template.category);
          return (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">{category?.icon}</span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {template.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(template.category)}`}>
                        Paso {template.step}
                      </span>
                      {template.isActive ? (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Activo
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Inactivo
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {template.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Settings className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Variables</span>
                        </div>
                        <p className="text-lg font-bold text-blue-600">
                          {template.variables.length}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Ejemplos</span>
                        </div>
                        <p className="text-lg font-bold text-green-600">
                          {template.examples.length}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Actualizado</span>
                        </div>
                        <p className="text-sm font-bold text-purple-600">
                          {new Date(template.updatedAt).toLocaleDateString('es-CL')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {template.variables.slice(0, 3).map((variable, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs rounded-full">
                          {variable.name}
                        </span>
                      ))}
                      {template.variables.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                          +{template.variables.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => executePrompt(template)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => duplicateTemplate(template)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteTemplate(template.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No se encontraron templates
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Comienza creando tu primer template de prompt'
            }
          </p>
        </div>
      )}
    </ContentLayout>
  );
}
