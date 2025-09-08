import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { trace, metrics, context, SpanStatusCode, SpanKind } from '@opentelemetry/api';

/**
 * OpenTelemetry Observability Setup
 * 
 * Features:
 * - Distributed tracing with OTLP export
 * - Custom metrics for agent performance
 * - Structured logging with trace correlation
 * - Error tracking and alerting
 * - Performance monitoring
 */

export class OpenTelemetryTracing {
  private sdk: NodeSDK | null = null;
  private tracer = trace.getTracer('aiaiai-consulting', '1.0.0');
  private meter = metrics.getMeter('aiaiai-consulting', '1.0.0');

  // Custom metrics
  private jobCounter = this.meter.createCounter('aiaiai_jobs_total', {
    description: 'Total number of jobs processed',
  });

  private jobDuration = this.meter.createHistogram('aiaiai_job_duration_ms', {
    description: 'Job processing duration in milliseconds',
  });

  private agentPerformance = this.meter.createGauge('aiaiai_agent_performance_score', {
    description: 'Agent performance score (0-100)',
  });

  private errorCounter = this.meter.createCounter('aiaiai_errors_total', {
    description: 'Total number of errors',
  });

  private activeJobs = this.meter.createUpDownCounter('aiaiai_active_jobs', {
    description: 'Number of currently active jobs',
  });

  private tokensUsed = this.meter.createCounter('aiaiai_tokens_used_total', {
    description: 'Total tokens used across all agents',
  });

  private tenantUsage = this.meter.createCounter('aiaiai_tenant_usage_total', {
    description: 'Usage metrics per tenant',
  });

  initialize(): void {
    if (this.sdk) {
      console.warn('OpenTelemetry SDK already initialized');
      return;
    }

    const resource = new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: 'aiaiai-consulting-api',
      [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
      [SemanticResourceAttributes.SERVICE_NAMESPACE]: 'aiaiai',
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV || 'development',
    });

    const traceExporter = new OTLPTraceExporter({
      url: process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT || 'http://localhost:4318/v1/traces',
      headers: {
        'Authorization': process.env.OTEL_EXPORTER_OTLP_HEADERS || '',
      },
    });

    const metricExporter = new OTLPMetricExporter({
      url: process.env.OTEL_EXPORTER_OTLP_METRICS_ENDPOINT || 'http://localhost:4318/v1/metrics',
      headers: {
        'Authorization': process.env.OTEL_EXPORTER_OTLP_HEADERS || '',
      },
    });

    const metricReader = new PeriodicExportingMetricReader({
      exporter: metricExporter,
      exportIntervalMillis: 30000, // Export every 30 seconds
    });

    this.sdk = new NodeSDK({
      resource,
      traceExporter,
      metricReader,
      instrumentations: [
        getNodeAutoInstrumentations({
          '@opentelemetry/instrumentation-fs': {
            enabled: false, // Disable file system instrumentation
          },
          '@opentelemetry/instrumentation-net': {
            enabled: true,
          },
          '@opentelemetry/instrumentation-http': {
            enabled: true,
            requestHook: (span, request) => {
              span.setAttributes({
                'http.request.body.size': request.getHeader('content-length') || 0,
                'user.agent': request.getHeader('user-agent') || 'unknown',
              });
            },
            responseHook: (span, response) => {
              span.setAttributes({
                'http.response.body.size': response.getHeader('content-length') || 0,
              });
            },
          },
          '@opentelemetry/instrumentation-express': {
            enabled: true,
          },
          '@opentelemetry/instrumentation-fastify': {
            enabled: true,
          },
        }),
      ],
    });

    this.sdk.start();
    console.log('OpenTelemetry SDK initialized successfully');
  }

  shutdown(): Promise<void> {
    if (this.sdk) {
      return this.sdk.shutdown();
    }
    return Promise.resolve();
  }

  // Job tracking methods
  startJobSpan(jobId: string, agent: string, tenantId: string) {
    return this.tracer.startSpan('job.processing', {
      kind: SpanKind.CONSUMER,
      attributes: {
        'job.id': jobId,
        'agent.name': agent,
        'tenant.id': tenantId,
        'job.type': 'agent_execution',
      },
    });
  }

  recordJobMetrics(jobId: string, agent: string, tenantId: string, duration: number, tokens: number, success: boolean) {
    const labels = {
      agent,
      tenant_id: tenantId,
      status: success ? 'success' : 'error',
    };

    this.jobCounter.add(1, labels);
    this.jobDuration.record(duration, labels);
    this.tokensUsed.add(tokens, labels);
    this.tenantUsage.add(1, { tenant_id: tenantId, metric: 'jobs_processed' });

    if (!success) {
      this.errorCounter.add(1, { ...labels, error_type: 'job_failure' });
    }
  }

  recordAgentPerformance(agent: string, tenantId: string, score: number) {
    this.agentPerformance.record(score, {
      agent,
      tenant_id: tenantId,
    });
  }

  recordActiveJobs(tenantId: string, delta: number) {
    this.activeJobs.add(delta, { tenant_id: tenantId });
  }

  recordError(error: Error, context: Record<string, any> = {}) {
    const labels = {
      error_type: error.constructor.name,
      error_message: error.message,
      ...context,
    };

    this.errorCounter.add(1, labels);

    // Create error span
    const span = this.tracer.startSpan('error.occurred', {
      kind: SpanKind.INTERNAL,
      attributes: {
        'error.type': error.constructor.name,
        'error.message': error.message,
        'error.stack': error.stack || '',
        ...context,
      },
    });

    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: error.message,
    });

    span.end();
  }

  // Custom span for agent operations
  createAgentSpan(agent: string, operation: string, tenantId: string) {
    return this.tracer.startSpan(`agent.${agent}.${operation}`, {
      kind: SpanKind.INTERNAL,
      attributes: {
        'agent.name': agent,
        'agent.operation': operation,
        'tenant.id': tenantId,
      },
    });
  }

  // Custom span for database operations
  createDatabaseSpan(operation: string, table: string, tenantId: string) {
    return this.tracer.startSpan(`db.${operation}`, {
      kind: SpanKind.CLIENT,
      attributes: {
        'db.operation': operation,
        'db.table': table,
        'tenant.id': tenantId,
      },
    });
  }

  // Custom span for external API calls
  createExternalApiSpan(service: string, endpoint: string, tenantId: string) {
    return this.tracer.startSpan(`external.${service}`, {
      kind: SpanKind.CLIENT,
      attributes: {
        'external.service': service,
        'external.endpoint': endpoint,
        'tenant.id': tenantId,
      },
    });
  }

  // Utility method to run code with tracing
  async withTracing<T>(
    operation: string,
    fn: () => Promise<T>,
    attributes: Record<string, any> = {}
  ): Promise<T> {
    const span = this.tracer.startSpan(operation, {
      attributes,
    });

    try {
      const result = await context.with(trace.setSpan(context.active(), span), fn);
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error instanceof Error ? error.message : 'Unknown error',
      });
      span.recordException(error instanceof Error ? error : new Error(String(error)));
      throw error;
    } finally {
      span.end();
    }
  }

  // Get current trace ID for logging
  getCurrentTraceId(): string {
    const span = trace.getActiveSpan();
    if (span) {
      const spanContext = span.spanContext();
      return spanContext.traceId;
    }
    return 'unknown';
  }

  // Get current span ID for logging
  getCurrentSpanId(): string {
    const span = trace.getActiveSpan();
    if (span) {
      const spanContext = span.spanContext();
      return spanContext.spanId;
    }
    return 'unknown';
  }
}

// Export singleton instance
export const otelTracing = new OpenTelemetryTracing();
