import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { OpenTelemetrySDK } from './observability/telemetry'
import { authRoutes } from './routes/auth'
import { agentRoutes } from './routes/agents'
import { clientRoutes } from './routes/clients'
import { projectRoutes } from './routes/projects'
import { reportRoutes } from './routes/reports'
import { webhookRoutes } from './routes/webhooks'
import { errorHandler } from './middleware/error'
import { authMiddleware } from './middleware/auth'
import { logger } from './utils/logger'
import { config } from './config'

/**
 * AIAIAI Consulting API Server
 * 
 * Features:
 * - Fastify with TypeScript
 * - OpenAPI documentation
 * - OpenTelemetry observability
 * - Rate limiting and security
 * - JWT authentication
 * - Agent orchestration
 */
async function buildServer() {
  // Initialize OpenTelemetry
  OpenTelemetrySDK.start()
  
  const fastify = Fastify({
    logger: {
      level: config.LOG_LEVEL,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname'
        }
      }
    }
  })

  // Security middleware
  await fastify.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "blob:"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: ["'self'", "https://api.aiaiai.cl"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"]
      }
    }
  })

  // CORS
  await fastify.register(cors, {
    origin: config.ALLOWED_ORIGINS,
    credentials: true
  })

  // Rate limiting
  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
    keyGenerator: (request) => {
      return request.headers['x-forwarded-for'] as string || 
             request.ip || 
             'unknown'
    }
  })

  // Swagger documentation
  await fastify.register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'AIAIAI Consulting API',
        description: 'API for AI agents and business automation',
        version: '1.0.0',
        contact: {
          name: 'AIAIAI Consulting',
          email: 'tomas@aiaiai.cl',
          url: 'https://aiaiai.cl'
        },
        license: {
          name: 'MIT',
          url: 'https://opensource.org/licenses/MIT'
        }
      },
      servers: [
        {
          url: config.API_URL,
          description: 'Production server'
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      }
    }
  })

  await fastify.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false
    }
  })

  // Error handling
  fastify.setErrorHandler(errorHandler)

  // Health check
  fastify.get('/health', {
    schema: {
      description: 'Health check endpoint',
      tags: ['health'],
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            timestamp: { type: 'string' },
            uptime: { type: 'number' },
            version: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0'
    }
  })

  // API routes
  await fastify.register(authRoutes, { prefix: '/api/v1/auth' })
  await fastify.register(agentRoutes, { prefix: '/api/v1/agents' })
  await fastify.register(clientRoutes, { prefix: '/api/v1/clients' })
  await fastify.register(projectRoutes, { prefix: '/api/v1/projects' })
  await fastify.register(reportRoutes, { prefix: '/api/v1/reports' })
  await fastify.register(webhookRoutes, { prefix: '/api/v1/webhooks' })

  return fastify
}

async function start() {
  try {
    const server = await buildServer()
    
    await server.listen({
      port: config.PORT,
      host: config.HOST
    })

    logger.info(`🚀 AIAIAI Consulting API server running on ${config.API_URL}`)
    logger.info(`📚 API documentation available at ${config.API_URL}/docs`)
    logger.info(`🔍 Health check available at ${config.API_URL}/health`)
    
  } catch (err) {
    logger.error('Error starting server:', err)
    process.exit(1)
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully')
  process.exit(0)
})

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully')
  process.exit(0)
})

start()
