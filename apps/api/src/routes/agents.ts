import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { AgentService } from '../services/agent'
import { authMiddleware } from '../middleware/auth'
import { logger } from '../utils/logger'

/**
 * Agent Routes
 * 
 * Handles all agent-related operations:
 * - List available agents
 * - Get agent details
 * - Execute agent jobs
 * - Get job status
 * - Agent configuration
 */

// Request/Response schemas
const AgentListQuerySchema = z.object({
  category: z.string().optional(),
  status: z.enum(['active', 'inactive', 'beta']).optional(),
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0)
})

const AgentJobSchema = z.object({
  agent: z.string(),
  payload: z.record(z.any()),
  policy: z.object({
    mode: z.enum(['auto', 'review', 'approve']).default('auto'),
    sla_sec: z.number().min(30).max(3600).default(300)
  }).optional()
})

const AgentConfigSchema = z.object({
  agent: z.string(),
  config: z.record(z.any())
})

export async function agentRoutes(fastify: FastifyInstance) {
  const agentService = new AgentService()

  // List available agents
  fastify.get('/', {
    preHandler: [authMiddleware],
    schema: {
      description: 'List available agents',
      tags: ['agents'],
      querystring: AgentListQuerySchema,
      response: {
        200: {
          type: 'object',
          properties: {
            agents: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  description: { type: 'string' },
                  category: { type: 'string' },
                  status: { type: 'string' },
                  version: { type: 'string' },
                  pricing: {
                    type: 'object',
                    properties: {
                      monthly: { type: 'number' },
                      currency: { type: 'string' }
                    }
                  },
                  capabilities: {
                    type: 'array',
                    items: { type: 'string' }
                  },
                  integrations: {
                    type: 'array',
                    items: { type: 'string' }
                  }
                }
              }
            },
            pagination: {
              type: 'object',
              properties: {
                total: { type: 'number' },
                limit: { type: 'number' },
                offset: { type: 'number' },
                hasMore: { type: 'boolean' }
              }
            }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Querystring: z.infer<typeof AgentListQuerySchema> }>, reply: FastifyReply) => {
    try {
      const { category, status, limit, offset } = request.query
      const userId = request.user?.id

      const result = await agentService.listAgents({
        category,
        status,
        limit,
        offset,
        userId
      })

      return reply.send(result)
    } catch (error) {
      logger.error('Error listing agents:', error)
      return reply.status(500).send({ error: 'Internal server error' })
    }
  })

  // Get agent details
  fastify.get('/:agentId', {
    preHandler: [authMiddleware],
    schema: {
      description: 'Get agent details',
      tags: ['agents'],
      params: {
        type: 'object',
        properties: {
          agentId: { type: 'string' }
        },
        required: ['agentId']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            category: { type: 'string' },
            status: { type: 'string' },
            version: { type: 'string' },
            spec: { type: 'object' },
            pricing: { type: 'object' },
            capabilities: { type: 'array' },
            integrations: { type: 'array' },
            sla: { type: 'object' },
            examples: { type: 'object' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: { agentId: string } }>, reply: FastifyReply) => {
    try {
      const { agentId } = request.params
      const userId = request.user?.id

      const agent = await agentService.getAgent(agentId, userId)

      if (!agent) {
        return reply.status(404).send({ error: 'Agent not found' })
      }

      return reply.send(agent)
    } catch (error) {
      logger.error('Error getting agent:', error)
      return reply.status(500).send({ error: 'Internal server error' })
    }
  })

  // Execute agent job
  fastify.post('/:agentId/execute', {
    preHandler: [authMiddleware],
    schema: {
      description: 'Execute agent job',
      tags: ['agents'],
      params: {
        type: 'object',
        properties: {
          agentId: { type: 'string' }
        },
        required: ['agentId']
      },
      body: AgentJobSchema,
      response: {
        202: {
          type: 'object',
          properties: {
            job_id: { type: 'string' },
            status: { type: 'string' },
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ 
    Params: { agentId: string }
    Body: z.infer<typeof AgentJobSchema>
  }>, reply: FastifyReply) => {
    try {
      const { agentId } = request.params
      const { payload, policy } = request.body
      const userId = request.user?.id

      const job = await agentService.executeJob({
        agentId,
        payload,
        policy,
        userId,
        tenantId: request.user?.tenantId
      })

      return reply.status(202).send({
        job_id: job.id,
        status: 'accepted',
        message: 'Job queued for execution'
      })
    } catch (error) {
      logger.error('Error executing agent job:', error)
      return reply.status(500).send({ error: 'Internal server error' })
    }
  })

  // Get job status
  fastify.get('/jobs/:jobId', {
    preHandler: [authMiddleware],
    schema: {
      description: 'Get job status',
      tags: ['agents'],
      params: {
        type: 'object',
        properties: {
          jobId: { type: 'string' }
        },
        required: ['jobId']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            job_id: { type: 'string' },
            status: { type: 'string' },
            progress: { type: 'number' },
            result: { type: 'object' },
            error: { type: 'string' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: { jobId: string } }>, reply: FastifyReply) => {
    try {
      const { jobId } = request.params
      const userId = request.user?.id

      const job = await agentService.getJobStatus(jobId, userId)

      if (!job) {
        return reply.status(404).send({ error: 'Job not found' })
      }

      return reply.send(job)
    } catch (error) {
      logger.error('Error getting job status:', error)
      return reply.status(500).send({ error: 'Internal server error' })
    }
  })

  // Configure agent
  fastify.put('/:agentId/config', {
    preHandler: [authMiddleware],
    schema: {
      description: 'Configure agent',
      tags: ['agents'],
      params: {
        type: 'object',
        properties: {
          agentId: { type: 'string' }
        },
        required: ['agentId']
      },
      body: AgentConfigSchema,
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ 
    Params: { agentId: string }
    Body: z.infer<typeof AgentConfigSchema>
  }>, reply: FastifyReply) => {
    try {
      const { agentId } = request.params
      const { config } = request.body
      const userId = request.user?.id

      await agentService.configureAgent(agentId, config, userId)

      return reply.send({
        success: true,
        message: 'Agent configured successfully'
      })
    } catch (error) {
      logger.error('Error configuring agent:', error)
      return reply.status(500).send({ error: 'Internal server error' })
    }
  })

  // Get agent metrics
  fastify.get('/:agentId/metrics', {
    preHandler: [authMiddleware],
    schema: {
      description: 'Get agent metrics',
      tags: ['agents'],
      params: {
        type: 'object',
        properties: {
          agentId: { type: 'string' }
        },
        required: ['agentId']
      },
      querystring: {
        type: 'object',
        properties: {
          period: z.enum(['day', 'week', 'month']).default('week'),
          start_date: z.string().optional(),
          end_date: z.string().optional()
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            agent_id: { type: 'string' },
            period: { type: 'string' },
            metrics: {
              type: 'object',
              properties: {
                total_jobs: { type: 'number' },
                successful_jobs: { type: 'number' },
                failed_jobs: { type: 'number' },
                average_latency_ms: { type: 'number' },
                success_rate: { type: 'number' },
                tokens_used: { type: 'number' },
                cost_usd: { type: 'number' }
              }
            }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ 
    Params: { agentId: string }
    Querystring: { period: string; start_date?: string; end_date?: string }
  }>, reply: FastifyReply) => {
    try {
      const { agentId } = request.params
      const { period, start_date, end_date } = request.query
      const userId = request.user?.id

      const metrics = await agentService.getAgentMetrics({
        agentId,
        period,
        startDate: start_date,
        endDate: end_date,
        userId
      })

      return reply.send(metrics)
    } catch (error) {
      logger.error('Error getting agent metrics:', error)
      return reply.status(500).send({ error: 'Internal server error' })
    }
  })
}
