import { PromptTemplate } from '@/types/prompts';

// Templates de prompts para el proceso de consultoría
export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'meeting-agenda',
    name: 'Agendamiento de Reunión',
    description: 'Template para agendar reuniones con clientes potenciales',
    category: 'meeting',
    step: 1,
    template: `Eres un consultor senior de AIAIAI Consulting. Tu tarea es agendar una reunión profesional con un cliente potencial.

**Información del Cliente:**
- Empresa: {{companyName}}
- Industria: {{industry}}
- Tamaño: {{companySize}}
- Contacto: {{contactName}} ({{contactRole}})
- Email: {{contactEmail}}
- Teléfono: {{contactPhone}}

**Objetivo de la Reunión:**
{{meetingObjective}}

**Duración Sugerida:** {{duration}} minutos
**Plataforma:** {{platform}}

Genera un email profesional para agendar la reunión que incluya:
1. Saludo personalizado
2. Presentación de AIAIAI Consulting
3. Objetivo claro de la reunión
4. Propuesta de fechas y horarios
5. Información sobre la plataforma de reunión
6. Cierre profesional

El tono debe ser profesional pero cercano, enfocado en el valor que podemos aportar.`,
    variables: [
      { name: 'companyName', type: 'text', description: 'Nombre de la empresa', required: true },
      { name: 'industry', type: 'text', description: 'Industria de la empresa', required: true },
      { name: 'companySize', type: 'list', description: 'Tamaño de la empresa', required: true, options: ['startup', 'pyme', 'empresa', 'corporacion'] },
      { name: 'contactName', type: 'text', description: 'Nombre del contacto', required: true },
      { name: 'contactRole', type: 'text', description: 'Cargo del contacto', required: true },
      { name: 'contactEmail', type: 'text', description: 'Email del contacto', required: true },
      { name: 'contactPhone', type: 'text', description: 'Teléfono del contacto', required: false },
      { name: 'meetingObjective', type: 'text', description: 'Objetivo de la reunión', required: true },
      { name: 'duration', type: 'number', description: 'Duración en minutos', required: true, defaultValue: '45' },
      { name: 'platform', type: 'list', description: 'Plataforma de reunión', required: true, options: ['Google Meet', 'Zoom', 'Teams', 'Presencial'] }
    ],
    examples: [
      {
        id: '1',
        title: 'Agendamiento para PYME de Turismo',
        input: {
          companyName: 'Sueño Andino',
          industry: 'Turismo Sostenible',
          companySize: 'pyme',
          contactName: 'María González',
          contactRole: 'CEO',
          contactEmail: 'maria@sueñoandino.cl',
          meetingObjective: 'Implementar agentes de IA para automatización de atención al cliente'
        },
        output: `Estimada María,

Espero que se encuentre muy bien. Mi nombre es Tomás, consultor senior de AIAIAI Consulting, y me pongo en contacto con usted para presentarle nuestras soluciones de inteligencia artificial.

He revisado el perfil de Sueño Andino y me parece fascinante su enfoque en turismo sostenible. Entiendo que están buscando implementar agentes de IA para automatizar la atención al cliente, lo cual es exactamente nuestra especialidad.

Me gustaría agendar una reunión de 45 minutos para:
• Entender mejor sus necesidades específicas
• Presentar casos de éxito similares en la industria del turismo
• Explorar cómo podemos ayudarles a automatizar su atención al cliente
• Discutir opciones de implementación y presupuesto

¿Le parece bien si coordinamos para la próxima semana? Tengo disponibilidad:
• Martes 15 de enero: 10:00 AM o 2:00 PM
• Miércoles 16 de enero: 9:00 AM o 3:00 PM
• Jueves 17 de enero: 11:00 AM o 4:00 PM

La reunión sería vía Google Meet, y le enviaré el enlace una vez confirmemos el horario.

Quedo atento a su respuesta.

Saludos cordiales,
Tomás
Consultor Senior
AIAIAI Consulting`,
        description: 'Ejemplo de agendamiento para una PYME del sector turismo'
      }
    ],
    isActive: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: 'meeting-transcription',
    name: 'Transcripción y Minuta',
    description: 'Template para procesar transcripciones de reuniones',
    category: 'meeting',
    step: 2,
    template: `Eres un asistente especializado en procesamiento de reuniones de consultoría. Tu tarea es analizar la transcripción de una reunión y generar una minuta estructurada.

**Transcripción de la Reunión:**
{{transcription}}

**Información del Cliente:**
- Empresa: {{companyName}}
- Industria: {{industry}}
- Participantes: {{participants}}

Genera una minuta profesional que incluya:

## MINUTA DE REUNIÓN
### Información General
- **Fecha:** {{meetingDate}}
- **Duración:** {{duration}} minutos
- **Participantes:** {{participants}}
- **Objetivo:** {{meetingObjective}}

### Puntos Clave Discutidos
1. **Necesidades del Cliente**
2. **Pain Points Identificados**
3. **Objetivos y Expectativas**
4. **Presupuesto y Timeline**
5. **Tecnología Actual**
6. **Próximos Pasos**

### Acciones Acordadas
- [ ] Acción 1
- [ ] Acción 2
- [ ] Acción 3

### Próxima Reunión
- **Fecha:** {{nextMeetingDate}}
- **Objetivo:** {{nextMeetingObjective}}

**Formato:** Usa markdown para una presentación clara y profesional.`,
    variables: [
      { name: 'transcription', type: 'text', description: 'Transcripción completa de la reunión', required: true },
      { name: 'companyName', type: 'text', description: 'Nombre de la empresa', required: true },
      { name: 'industry', type: 'text', description: 'Industria de la empresa', required: true },
      { name: 'participants', type: 'text', description: 'Lista de participantes', required: true },
      { name: 'meetingDate', type: 'date', description: 'Fecha de la reunión', required: true },
      { name: 'duration', type: 'number', description: 'Duración en minutos', required: true },
      { name: 'meetingObjective', type: 'text', description: 'Objetivo de la reunión', required: true },
      { name: 'nextMeetingDate', type: 'date', description: 'Fecha de próxima reunión', required: false },
      { name: 'nextMeetingObjective', type: 'text', description: 'Objetivo de próxima reunión', required: false }
    ],
    examples: [],
    isActive: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: 'meeting-insights',
    name: 'Análisis de Insights',
    description: 'Template para generar insights de reuniones con IA',
    category: 'analysis',
    step: 3,
    template: `Eres un analista experto en consultoría de IA. Tu tarea es analizar una minuta de reunión y generar insights estratégicos para la propuesta.

**Minuta de la Reunión:**
{{meetingMinutes}}

**Información del Cliente:**
- Empresa: {{companyName}}
- Industria: {{industry}}
- Tamaño: {{companySize}}

Genera un análisis completo que incluya:

## ANÁLISIS DE INSIGHTS - {{companyName}}

### 1. NECESIDADES IDENTIFICADAS
- **Primarias:** [Lista las necesidades más importantes]
- **Secundarias:** [Lista las necesidades complementarias]
- **Ocultas:** [Identifica necesidades no expresadas directamente]

### 2. PAIN POINTS
- **Operacionales:** [Problemas en procesos actuales]
- **Tecnológicos:** [Limitaciones de sistemas actuales]
- **Económicos:** [Problemas de costos o eficiencia]
- **Competitivos:** [Desventajas vs competencia]

### 3. OBJETIVOS DEL CLIENTE
- **Corto Plazo (3-6 meses):** [Objetivos inmediatos]
- **Mediano Plazo (6-12 meses):** [Objetivos estratégicos]
- **Largo Plazo (1+ años):** [Visión a futuro]

### 4. PERFIL TECNOLÓGICO
- **Nivel de Madurez Digital:** [Básico/Intermedio/Avanzado]
- **Sistemas Actuales:** [Lista de tecnologías en uso]
- **Capacidad de Adopción:** [Alta/Media/Baja]
- **Recursos Técnicos:** [Disponibilidad de equipo técnico]

### 5. ANÁLISIS FINANCIERO
- **Presupuesto Disponible:** {{budget}}
- **ROI Esperado:** [Cálculo estimado]
- **Timeline:** {{timeline}}
- **Urgencia:** [Alta/Media/Baja]

### 6. RECOMENDACIONES ESTRATÉGICAS
- **Solución Recomendada:** [Propuesta principal]
- **Alternativas:** [Opciones secundarias]
- **Riesgos:** [Identificación de riesgos]
- **Mitigaciones:** [Estrategias de mitigación]

**Formato:** Usa markdown y sé específico con datos y números cuando sea posible.`,
    variables: [
      { name: 'meetingMinutes', type: 'text', description: 'Minuta de la reunión', required: true },
      { name: 'companyName', type: 'text', description: 'Nombre de la empresa', required: true },
      { name: 'industry', type: 'text', description: 'Industria de la empresa', required: true },
      { name: 'companySize', type: 'list', description: 'Tamaño de la empresa', required: true, options: ['startup', 'pyme', 'empresa', 'corporacion'] },
      { name: 'budget', type: 'text', description: 'Presupuesto disponible', required: true },
      { name: 'timeline', type: 'text', description: 'Timeline del proyecto', required: true }
    ],
    examples: [],
    isActive: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: 'technical-proposal',
    name: 'Propuesta Técnica',
    description: 'Template para generar propuestas técnicas detalladas',
    category: 'proposal',
    step: 4,
    template: `Eres un arquitecto de soluciones de IA. Tu tarea es crear una propuesta técnica detallada basada en los insights del cliente.

**Información del Cliente:**
- Empresa: {{companyName}}
- Industria: {{industry}}
- Necesidades: {{needs}}
- Presupuesto: {{budget}}
- Timeline: {{timeline}}

**Insights de la Reunión:**
{{insights}}

Genera una propuesta técnica completa:

# PROPUESTA TÉCNICA - {{companyName}}
## Implementación de Soluciones de IA

### 1. RESUMEN EJECUTIVO
[Resumen de 2-3 párrafos del proyecto y beneficios esperados]

### 2. ANÁLISIS DE NECESIDADES
- **Necesidades Identificadas:** {{needs}}
- **Pain Points:** [Lista de problemas actuales]
- **Objetivos:** [Objetivos específicos del cliente]

### 3. SOLUCIÓN PROPUESTA

#### 3.1 Arquitectura General
[Diagrama conceptual de la solución]

#### 3.2 Componentes Principales
- **Componente 1:** [Descripción detallada]
- **Componente 2:** [Descripción detallada]
- **Componente 3:** [Descripción detallada]

#### 3.3 Tecnologías Utilizadas
- **Frontend:** [Tecnologías de interfaz]
- **Backend:** [Tecnologías de servidor]
- **IA/ML:** [Tecnologías de inteligencia artificial]
- **Integración:** [APIs y conectores]

### 4. BENEFICIOS ESPERADOS
- **Operacionales:** [Mejoras en procesos]
- **Económicos:** [Ahorros y ROI]
- **Competitivos:** [Ventajas competitivas]
- **Estratégicos:** [Beneficios a largo plazo]

### 5. CRONOGRAMA DE IMPLEMENTACIÓN
- **Fase 1 (Semanas 1-2):** [Análisis y diseño]
- **Fase 2 (Semanas 3-6):** [Desarrollo]
- **Fase 3 (Semanas 7-8):** [Implementación y pruebas]
- **Fase 4 (Semana 9):** [Capacitación y lanzamiento]

### 6. ENTREGABLES
- [ ] Sistema completo desarrollado
- [ ] Documentación técnica
- [ ] Capacitación del equipo
- [ ] Soporte post-implementación

**Formato:** Usa markdown y sé técnico pero comprensible.`,
    variables: [
      { name: 'companyName', type: 'text', description: 'Nombre de la empresa', required: true },
      { name: 'industry', type: 'text', description: 'Industria de la empresa', required: true },
      { name: 'needs', type: 'text', description: 'Necesidades identificadas', required: true },
      { name: 'budget', type: 'text', description: 'Presupuesto disponible', required: true },
      { name: 'timeline', type: 'text', description: 'Timeline del proyecto', required: true },
      { name: 'insights', type: 'text', description: 'Insights de la reunión', required: true }
    ],
    examples: [],
    isActive: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: 'market-benchmark',
    name: 'Análisis de Benchmark',
    description: 'Template para investigación de mercado y competencia',
    category: 'benchmark',
    step: 5,
    template: `Eres un analista de mercado especializado en servicios de IA. Tu tarea es realizar un análisis de benchmark del mercado chileno.

**Información del Proyecto:**
- Industria: {{industry}}
- Tipo de Solución: {{solutionType}}
- Presupuesto Cliente: {{clientBudget}}
- Timeline: {{timeline}}

**Propuesta Técnica:**
{{technicalProposal}}

Realiza un análisis completo de benchmark:

# ANÁLISIS DE BENCHMARK - MERCADO CHILENO
## {{industry}} - {{solutionType}}

### 1. ANÁLISIS DE PRECIOS POR FREELANCER
- **Desarrollador Junior:** $800.000 - $1.200.000 CLP/mes (Promedio: $1.000.000)
- **Desarrollador Senior:** $1.500.000 - $2.500.000 CLP/mes (Promedio: $2.000.000)
- **Consultor IA:** $2.000.000 - $3.500.000 CLP/mes (Promedio: $2.750.000)
- **Proyecto Completo:** $8.000.000 - $15.000.000 CLP

### 2. ANÁLISIS DE PRECIOS POR AGENCIA
- **Agencia Pequeña:** $15.000.000 - $25.000.000 CLP (Promedio: $20.000.000)
- **Agencia Mediana:** $25.000.000 - $40.000.000 CLP (Promedio: $32.500.000)
- **Agencia Grande:** $40.000.000 - $80.000.000 CLP (Promedio: $60.000.000)

### 3. ANÁLISIS COMPETITIVO
| Competidor | Precio | Timeline | Rating | Observaciones |
|------------|--------|----------|--------|---------------|
| TecnoSoluciones | $20.000.000 | 6 meses | 4.2/5 | Enfoque en desarrollo tradicional |
| DigitalPro | $35.000.000 | 4 meses | 4.5/5 | Buena calidad pero precio alto |
| IAChile | $45.000.000 | 3 meses | 4.7/5 | Especialistas en IA |
| TechCorp | $60.000.000 | 2 meses | 4.8/5 | Premium pero muy caro |

### 4. POSICIONAMIENTO RECOMENDADO
- **Precio Sugerido:** $18.500.000 CLP
- **Justificación:** [Explicación del pricing basada en el análisis]
- **Ventajas Competitivas:** [Lista de diferenciadores]
- **Estrategia de Valor:** [Cómo comunicar el valor]

### 5. ANÁLISIS DE RIESGOS
- **Riesgos de Precio:** [Identificación de riesgos]
- **Mitigaciones:** [Estrategias de mitigación]
- **Alternativas:** [Opciones de pricing]

**Formato:** Usa markdown y tablas para presentación clara.`,
    variables: [
      { name: 'industry', type: 'text', description: 'Industria del cliente', required: true },
      { name: 'solutionType', type: 'text', description: 'Tipo de solución', required: true },
      { name: 'clientBudget', type: 'text', description: 'Presupuesto del cliente', required: true },
      { name: 'timeline', type: 'text', description: 'Timeline del proyecto', required: true },
      { name: 'technicalProposal', type: 'text', description: 'Propuesta técnica', required: true },
      { name: 'recommendedPrice', type: 'number', description: 'Precio recomendado', required: true, defaultValue: '18500000' }
    ],
    examples: [],
    isActive: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: 'commercial-proposal',
    name: 'Propuesta Comercial',
    description: 'Template para propuestas comerciales finales',
    category: 'commercial',
    step: 6,
    template: `Eres un consultor comercial experto. Tu tarea es crear una propuesta comercial atractiva y competitiva.

**Información del Cliente:**
- Empresa: {{companyName}}
- Industria: {{industry}}
- Presupuesto: {{budget}}
- Timeline: {{timeline}}

**Propuesta Técnica:**
{{technicalProposal}}

**Análisis de Benchmark:**
{{benchmarkAnalysis}}

Genera una propuesta comercial completa:

# PROPUESTA COMERCIAL
## {{companyName}} - Soluciones de IA

### 1. RESUMEN EJECUTIVO
[Resumen de 2-3 párrafos del proyecto, beneficios y valor]

### 2. NUESTRA PROPUESTA

#### 2.1 Solución Integral
{{solutionDescription}}

#### 2.2 Beneficios Clave
- **Operacionales:** [Mejoras en procesos]
- **Económicos:** [Ahorros y ROI]
- **Competitivos:** [Ventajas competitivas]
- **Estratégicos:** [Beneficios a largo plazo]

### 3. INVERSIÓN TOTAL
**$18.500.000 CLP** (Dieciocho millones quinientos mil pesos)

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
4. **Inicio del proyecto**

**Formato:** Usa markdown y sé persuasivo pero profesional.`,
    variables: [
      { name: 'companyName', type: 'text', description: 'Nombre de la empresa', required: true },
      { name: 'industry', type: 'text', description: 'Industria de la empresa', required: true },
      { name: 'budget', type: 'text', description: 'Presupuesto del cliente', required: true },
      { name: 'timeline', type: 'text', description: 'Timeline del proyecto', required: true },
      { name: 'technicalProposal', type: 'text', description: 'Propuesta técnica', required: true },
      { name: 'benchmarkAnalysis', type: 'text', description: 'Análisis de benchmark', required: true },
      { name: 'solutionDescription', type: 'text', description: 'Descripción de la solución', required: true },
      { name: 'totalPrice', type: 'number', description: 'Precio total', required: true, defaultValue: '18500000' },
      { name: 'totalPriceText', type: 'text', description: 'Precio total en texto', required: true, defaultValue: 'Dieciocho millones quinientos mil pesos' }
    ],
    examples: [],
    isActive: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  }
];
