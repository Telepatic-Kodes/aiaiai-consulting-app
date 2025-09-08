"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ContentLayout } from '@/components/layout/ContentLayout';
import { 
  Brain, 
  Play, 
  Copy, 
  Download,
  Save,
  ArrowLeft,
  Settings,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { PromptTemplate, PromptVariable } from '@/types/prompts';

interface PromptExecutorProps {
  template: PromptTemplate;
  onBack: () => void;
}

export function PromptExecutor({ template, onBack }: PromptExecutorProps) {
  const [variables, setVariables] = useState<Record<string, any>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [executionStatus, setExecutionStatus] = useState<'idle' | 'generating' | 'executing' | 'completed' | 'error'>('idle');

  const handleVariableChange = (variableName: string, value: any) => {
    setVariables(prev => ({
      ...prev,
      [variableName]: value
    }));
  };

  const generatePrompt = () => {
    setIsGenerating(true);
    setExecutionStatus('generating');
    
    // Simular generación del prompt
    setTimeout(() => {
      let prompt = template.template;
      
      // Reemplazar variables en el template
      Object.entries(variables).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        prompt = prompt.replace(regex, value || '');
      });
      
      setGeneratedPrompt(prompt);
      setIsGenerating(false);
      setExecutionStatus('idle');
    }, 1000);
  };

  const executePrompt = async () => {
    setIsExecuting(true);
    setExecutionStatus('executing');
    
    // Simular ejecución del prompt con IA
    setTimeout(() => {
      const mockResponse = generateMockResponse(template);
      setResponse(mockResponse);
      setIsExecuting(false);
      setExecutionStatus('completed');
    }, 3000);
  };

  const generateMockResponse = (template: PromptTemplate): string => {
    switch (template.id) {
      case 'meeting-agenda':
        return `Estimada ${variables.contactName || '[Nombre]'},

Espero que se encuentre muy bien. Mi nombre es Tomás, consultor senior de AIAIAI Consulting, y me pongo en contacto con usted para presentarle nuestras soluciones de inteligencia artificial.

He revisado el perfil de ${variables.companyName || '[Empresa]'} y me parece fascinante su enfoque en ${variables.industry || '[Industria]'}. Entiendo que están buscando ${variables.meetingObjective || '[Objetivo]'}, lo cual es exactamente nuestra especialidad.

Me gustaría agendar una reunión de ${variables.duration || '45'} minutos para:
• Entender mejor sus necesidades específicas
• Presentar casos de éxito similares en la industria
• Explorar cómo podemos ayudarles a automatizar sus procesos
• Discutir opciones de implementación y presupuesto

¿Le parece bien si coordinamos para la próxima semana? Tengo disponibilidad:
• Martes: 10:00 AM o 2:00 PM
• Miércoles: 9:00 AM o 3:00 PM
• Jueves: 11:00 AM o 4:00 PM

La reunión sería vía ${variables.platform || 'Google Meet'}, y le enviaré el enlace una vez confirmemos el horario.

Quedo atento a su respuesta.

Saludos cordiales,
Tomás
Consultor Senior
AIAIAI Consulting`;

      case 'meeting-insights':
        return `## ANÁLISIS DE INSIGHTS - ${variables.companyName || '[Empresa]'}

### 1. NECESIDADES IDENTIFICADAS
- **Primarias:** Automatización de atención al cliente, respuesta rápida en WhatsApp, sistema de reservas integrado
- **Secundarias:** Escalabilidad para crecimiento, integración con sistemas existentes
- **Ocultas:** Reducción de costos operacionales, mejora en la experiencia del cliente

### 2. PAIN POINTS
- **Operacionales:** No pueden responder rápido cuando están en terreno, pérdida de ventas por demora
- **Tecnológicos:** Sistema actual muy básico, falta de integración
- **Económicos:** Costos altos de atención manual, ineficiencia en procesos
- **Competitivos:** Competidores con mejor tecnología, pérdida de clientes

### 3. OBJETIVOS DEL CLIENTE
- **Corto Plazo (3-6 meses):** Implementar sistema básico de automatización
- **Mediano Plazo (6-12 meses):** Escalar a 500 clientes mensuales
- **Largo Plazo (1+ años):** Liderar en innovación tecnológica del sector

### 4. PERFIL TECNOLÓGICO
- **Nivel de Madurez Digital:** Intermedio
- **Sistemas Actuales:** ReservasPro (básico), WhatsApp Business
- **Capacidad de Adopción:** Media
- **Recursos Técnicos:** Limitados, necesitan soporte externo

### 5. ANÁLISIS FINANCIERO
- **Presupuesto Disponible:** ${variables.budget || '[Presupuesto]'}
- **ROI Esperado:** 300% en el primer año
- **Timeline:** ${variables.timeline || '[Timeline]'}
- **Urgencia:** Alta (temporada alta en octubre)

### 6. RECOMENDACIONES ESTRATÉGICAS
- **Solución Recomendada:** Agente de WhatsApp con IA + Sistema de reservas integrado
- **Alternativas:** Solución básica solo WhatsApp, solución completa con múltiples canales
- **Riesgos:** Resistencia al cambio, curva de aprendizaje
- **Mitigaciones:** Capacitación intensiva, soporte post-implementación`;

      case 'commercial-proposal':
        return `# PROPUESTA COMERCIAL
## ${variables.companyName || '[Empresa]'} - Soluciones de IA

### 1. RESUMEN EJECUTIVO
AIAIAI Consulting se complace en presentar esta propuesta para implementar una solución integral de agentes de IA que transformará la atención al cliente de ${variables.companyName || '[Empresa]'}. Nuestra solución automatizará el 80% de las consultas, reducirá el tiempo de respuesta en un 90% y aumentará las ventas en un 40%.

### 2. NUESTRA PROPUESTA

#### 2.1 Solución Integral
Implementación de agentes de IA conversacionales que se integran perfectamente con sus sistemas existentes, proporcionando atención 24/7 y escalabilidad para su crecimiento futuro.

#### 2.2 Beneficios Clave
- **Operacionales:** Automatización del 80% de consultas, disponibilidad 24/7
- **Económicos:** ROI del 300% en el primer año, ahorro de 20 horas/semana
- **Competitivos:** Ventaja tecnológica sobre competidores
- **Estratégicos:** Base sólida para crecimiento y expansión

### 3. INVERSIÓN TOTAL
**$${variables.totalPrice || '18.500.000'} CLP** (Dieciocho millones quinientos mil pesos)

#### 3.1 Desglose de Costos
- **Desarrollo:** $12.000.000 CLP (65%)
- **Implementación:** $3.000.000 CLP (16%)
- **Capacitación:** $2.000.000 CLP (11%)
- **Soporte:** $1.500.000 CLP (8%)

#### 3.2 Formas de Pago
- **Opción 1 - Pago Completo:** 50% al inicio, 50% al final
- **Opción 2 - Por Hitos:** 30% al inicio, 40% a la mitad, 30% al final
- **Opción 3 - Cuotas:** 12 cuotas de $1.541.667 CLP

### 4. CRONOGRAMA
- **Inicio:** 1 de febrero 2025
- **Entrega:** 1 de abril 2025
- **Lanzamiento:** 15 de abril 2025

### 5. INCLUYE
- [ ] Desarrollo completo del sistema
- [ ] Implementación y configuración
- [ ] Capacitación del equipo (8 horas)
- [ ] Documentación técnica
- [ ] 3 meses de soporte gratuito
- [ ] Mantenimiento mensual: $800.000 CLP

### 6. BONUS INCLUIDOS
- [ ] 1 mes adicional de soporte gratuito
- [ ] Optimización SEO para WhatsApp
- [ ] Reportes de analytics mensuales
- [ ] Integración con Google Analytics

### 7. ROI ESPERADO
- **Ahorro en Tiempo:** 20 horas/semana
- **Aumento en Ventas:** 40%
- **ROI:** 300% en el primer año
- **Payback Period:** 4 meses

### 8. GARANTÍAS
- ✅ 100% de satisfacción garantizada
- ✅ Reembolso completo si no cumple expectativas
- ✅ Soporte técnico ilimitado por 3 meses
- ✅ Actualizaciones gratuitas por 1 año

### 9. PRÓXIMOS PASOS
1. **Revisión de la propuesta** (7 días)
2. **Reunión de aclaraciones** (si es necesario)
3. **Firma del contrato**
4. **Inicio del proyecto**`;

      default:
        return `# Respuesta Generada para ${template.name}

Esta es una respuesta simulada para el template "${template.name}".

**Variables utilizadas:**
${Object.entries(variables).map(([key, value]) => `- ${key}: ${value}`).join('\n')}

**Template ID:** ${template.id}
**Categoría:** ${template.category}
**Paso:** ${template.step}

Esta respuesta sería generada por la IA real utilizando el prompt personalizado con las variables proporcionadas.`;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadResponse = () => {
    const blob = new Blob([response], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name}-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const requiredVariables = template.variables.filter(v => v.required);
  const allRequiredFilled = requiredVariables.every(v => variables[v.name]);

  return (
    <ContentLayout 
      title={`Ejecutor de Prompt: ${template.name}`}
      subtitle={template.description}
      actions={
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Panel de Variables */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Variables del Template
                </h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {template.variables.map((variable) => (
                <div key={variable.name}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {variable.name}
                    {variable.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {variable.description}
                  </p>
                  
                  {variable.type === 'text' && (
                    <Input
                      value={variables[variable.name] || ''}
                      onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                      placeholder={variable.defaultValue || `Ingresa ${variable.name}`}
                    />
                  )}
                  
                  {variable.type === 'number' && (
                    <Input
                      type="number"
                      value={variables[variable.name] || ''}
                      onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                      placeholder={variable.defaultValue || `Ingresa ${variable.name}`}
                    />
                  )}
                  
                  {variable.type === 'date' && (
                    <Input
                      type="date"
                      value={variables[variable.name] || ''}
                      onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                    />
                  )}
                  
                  {variable.type === 'list' && (
                    <select
                      value={variables[variable.name] || ''}
                      onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="">Selecciona una opción</option>
                      {variable.options?.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  )}
                  
                  {variable.type === 'boolean' && (
                    <select
                      value={variables[variable.name] || ''}
                      onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="">Selecciona</option>
                      <option value="true">Sí</option>
                      <option value="false">No</option>
                    </select>
                  )}
                </div>
              ))}
              
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={generatePrompt}
                  disabled={!allRequiredFilled || isGenerating}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isGenerating ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Generar Prompt
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel de Resultado */}
        <div className="space-y-6">
          {/* Prompt Generado */}
          {generatedPrompt && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Prompt Generado
                    </h3>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(generatedPrompt)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {generatedPrompt}
                  </pre>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button 
                    onClick={executePrompt}
                    disabled={isExecuting}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isExecuting ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Ejecutando...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Ejecutar con IA
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Respuesta de la IA */}
          {response && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {executionStatus === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : executionStatus === 'error' ? (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    ) : (
                      <Brain className="w-5 h-5 text-blue-600" />
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Respuesta de la IA
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(response)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={downloadResponse}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {response}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ContentLayout>
  );
}
