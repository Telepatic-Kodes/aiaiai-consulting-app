# AIAIAI Consulting - MVP Platform

## 🚀 Overview

AIAIAI Consulting es una plataforma de agentes de IA especializados para emprendedores LATAM. La plataforma permite a los usuarios gestionar, monitorear y automatizar procesos empresariales mediante agentes de IA inteligentes.

**Claim central**: "Tú enseñas. Ellos ejecutan. Tú creces."

## ✨ Features Implementadas

### 🏠 Dashboard Principal
- **Métricas en tiempo real**: Agentes activos, clientes, proyectos e ingresos
- **Gráficos interactivos**: Rendimiento de agentes, ingresos mensuales, estado de proyectos
- **Actividad reciente**: Feed de actividades y notificaciones
- **Acciones rápidas**: Acceso directo a funciones principales

### 🤖 Gestión de Agentes
- **Catálogo completo**: 5 agentes especializados predefinidos
- **Estados de agente**: Activo, desarrollo, inactivo
- **Métricas de rendimiento**: Precisión, tareas completadas, última ejecución
- **Creación de agentes**: Formulario completo con plantillas predefinidas
- **Categorización**: Comercial & Marketing, Operaciones & Cliente, etc.

### 👥 Gestión de Clientes
- **Base de datos de clientes**: Información completa de contacto y empresa
- **Estados de cliente**: Activo, prospecto, inactivo
- **Métricas de satisfacción**: NPS y feedback de clientes
- **Búsqueda y filtros**: Por industria, tamaño de empresa, estado
- **Historial de proyectos**: Proyectos asociados y ingresos

### 📋 Gestión de Proyectos
- **Seguimiento de proyectos**: Estado, progreso, fechas, presupuesto
- **Equipos de trabajo**: Asignación de miembros del equipo
- **Entregables**: Lista de entregables con estado de completitud
- **Timeline visual**: Fechas de inicio, fin y hitos importantes
- **Categorización**: Por tipo de proyecto y prioridad

### 📊 Reportes y Analytics
- **Dashboard de analytics**: Métricas completas de rendimiento
- **Gráficos interactivos**: Ingresos, satisfacción, estado de proyectos
- **Reportes descargables**: PDFs y documentos de análisis
- **Métricas de agentes**: Rendimiento individual y comparativo
- **Análisis financiero**: Ingresos, costos y rentabilidad

### 🔐 Autenticación y Seguridad
- **Login/Registro**: Formularios profesionales con validación
- **Autenticación OAuth**: Google y Microsoft (preparado)
- **Validación de contraseñas**: Fortaleza y confirmación
- **Términos y condiciones**: Aceptación requerida
- **Diseño responsive**: Mobile-first approach

## 🏗️ Arquitectura Técnica

### Frontend
- **Next.js 14**: App Router, Server Components, Edge Runtime
- **TypeScript**: Tipado estático para mejor desarrollo
- **Tailwind CSS**: Sistema de diseño profesional
- **Lucide React**: Iconografía consistente
- **Componentes reutilizables**: UI library personalizada

### Backend
- **API Routes**: Next.js API routes para backend
- **Validación de datos**: Esquemas de validación robustos
- **Manejo de errores**: Respuestas consistentes y profesionales
- **Mock data**: Datos de demostración realistas

### Diseño
- **Design System**: Colores, tipografía y espaciado consistentes
- **Responsive Design**: Mobile-first, tablet y desktop
- **Accesibilidad**: WCAG 2.1 AA compliance
- **UX Profesional**: Inspirado en McKinsey y consultorías top

## 🎨 Design System

### Colores
- **Primary**: Azul eléctrico (#3A86FF) - Confianza y profesionalismo
- **Accent**: Dorado (#FFD700) - Premium y exclusividad
- **Neutral**: Escala de grises profesional
- **Status**: Verde (éxito), Rojo (error), Amarillo (advertencia)

### Tipografía
- **Font Family**: Inter - Legibilidad y profesionalismo
- **Escalas**: 6 tamaños desde xs hasta 6xl
- **Pesos**: Regular, medium, semibold, bold

### Componentes
- **Button**: 5 variantes, 3 tamaños, estados de loading
- **Card**: Contenedores flexibles con header, content, footer
- **Input**: Validación, iconos, estados de error
- **MetricCard**: Métricas con tendencias y iconos
- **Chart**: Gráficos con múltiples tipos y formatos

## 📱 Páginas Implementadas

### Públicas
- **Landing Page** (`/`): Hero, features, CTA
- **Login** (`/login`): Autenticación con OAuth
- **Register** (`/register`): Registro completo con validación

### Dashboard
- **Dashboard** (`/dashboard`): Métricas y overview
- **Agentes** (`/agents`): Lista y gestión de agentes
- **Nuevo Agente** (`/agents/new`): Creación de agentes
- **Clientes** (`/clients`): Gestión de clientes
- **Proyectos** (`/projects`): Seguimiento de proyectos
- **Reportes** (`/reports`): Analytics y reportes

## 🔌 API Endpoints

### Agentes
- `GET /api/agents` - Listar agentes con filtros
- `POST /api/agents` - Crear nuevo agente

### Clientes
- `GET /api/clients` - Listar clientes con filtros
- `POST /api/clients` - Crear nuevo cliente

### Proyectos
- `GET /api/projects` - Listar proyectos con filtros
- `POST /api/projects` - Crear nuevo proyecto

### Dashboard
- `GET /api/dashboard` - Métricas y datos del dashboard

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+
- npm 8+

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd aiaiai-consulting-app

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
npm start
```

### Scripts Disponibles
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construcción para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linting del código
- `npm run type-check` - Verificación de tipos

## 📊 Agentes Implementados

### 1. Meeting Summarizer
- **Función**: Resumen automático de reuniones
- **Categoría**: Operaciones & Cliente
- **Precio**: $39/mes
- **Capacidades**: Análisis de transcripciones, extracción de tareas, análisis de sentimientos

### 2. Proposal Builder
- **Función**: Generación de propuestas comerciales
- **Categoría**: Comercial & Marketing
- **Precio**: $79/mes
- **Capacidades**: Generación de propuestas, cálculo de precios, templates

### 3. Lead Scorer
- **Función**: Calificación automática de leads
- **Categoría**: Comercial & Marketing
- **Precio**: $49/mes
- **Capacidades**: Calificación de leads, análisis de comportamiento, integración CRM

### 4. CRM Updater
- **Función**: Sincronización de datos
- **Categoría**: Operaciones & Cliente
- **Precio**: $59/mes
- **Capacidades**: Sincronización, mapeo de campos, detección de duplicados

### 5. Follow-up Scheduler
- **Función**: Automatización de seguimientos
- **Categoría**: Comercial & Marketing
- **Precio**: $49/mes
- **Capacidades**: Automatización, integración calendario, gestión de recordatorios

## 🎯 Próximos Pasos

### Fase 2 (30-60 días)
- [ ] Integración con APIs reales
- [ ] Base de datos PostgreSQL
- [ ] Autenticación JWT
- [ ] Notificaciones en tiempo real
- [ ] Integración con WhatsApp

### Fase 3 (60-90 días)
- [ ] Integración con Canva
- [ ] Integración con Google Drive
- [ ] Integración con Notion
- [ ] Publisher automático
- [ ] Mobile app

## 🤝 Contribución

### Estándares de Código
- **TypeScript**: Tipado estricto
- **ESLint**: Linting automático
- **Prettier**: Formateo consistente
- **Conventional Commits**: Mensajes de commit estandarizados

### Estructura del Proyecto
```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── agents/           # Agent management
│   ├── clients/          # Client management
│   ├── projects/         # Project management
│   └── reports/          # Reports and analytics
├── components/           # Reusable components
│   ├── ui/              # Base UI components
│   ├── layout/          # Layout components
│   └── dashboard/       # Dashboard components
├── lib/                 # Utilities and helpers
├── types/               # TypeScript type definitions
└── packages/            # Agent specifications
```

## 📞 Soporte

- **Email**: support@aiaiai.cl
- **Teléfono**: +56 9 1234 5678
- **WhatsApp**: +56 9 1234 5678
- **Documentación**: https://docs.aiaiai.cl

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para más detalles.

---

**AIAIAI Consulting** - Tú enseñas. Ellos ejecutan. Tú creces.

*Plataforma de agentes de IA para emprendedores LATAM*