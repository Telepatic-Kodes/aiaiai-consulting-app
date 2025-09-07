/**
 * AIAIAI Consulting - Professional Development Server
 * Enhanced server with security, logging, and API simulation
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';

// Enhanced MIME types with security considerations
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf',
  '.zip': 'application/zip'
};

// Security headers
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self'"
};

// Logging utility
const logger = {
  info: (msg) => console.log(`[INFO] ${new Date().toISOString()} - ${msg}`),
  error: (msg) => console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`),
  warn: (msg) => console.warn(`[WARN] ${new Date().toISOString()} - ${msg}`)
};

// API simulation for development
const apiHandler = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // Set CORS headers for API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Simulate API responses
  let responseData = {};
  
  switch (pathname) {
    case '/api/v1/metrics':
      responseData = {
        success: true,
        data: {
          totalRevenue: 172000,
          activeClients: 24,
          activeProjects: 12,
          teamUtilization: 87,
          averageSatisfaction: 4.7
        }
      };
      break;
      
    case '/api/v1/agents':
      responseData = {
        success: true,
        data: [
          {
            id: 'lead-scorer',
            name: 'Lead Scorer',
            status: 'active',
            precision: 85,
            tasksProcessed: 1247,
            timeSaved: 20,
            price: 49
          },
          {
            id: 'proposal-builder',
            name: 'Proposal Builder',
            status: 'active',
            precision: 95,
            tasksProcessed: 89,
            timeSaved: 40,
            price: 79
          }
        ]
      };
      break;
      
    default:
      responseData = {
        success: false,
        error: 'Endpoint not found',
        message: 'This is a development server. API endpoints are simulated.'
      };
  }
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(responseData, null, 2));
};

// Enhanced file server
const serveFile = (filePath, res) => {
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeType = mimeTypes[extname] || 'application/octet-stream';
  
  // Security: Prevent directory traversal
  const safePath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
  
  fs.readFile(safePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        serve404(res, filePath);
      } else {
        serve500(res, error);
      }
    } else {
      // Set security headers
      Object.entries(securityHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      
      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(content, 'utf-8');
    }
  });
};

// 404 handler
const serve404 = (res, filePath) => {
  res.writeHead(404, { 
    'Content-Type': 'text/html; charset=utf-8',
    ...securityHeaders
  });
  res.end(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>404 - No Encontrado | AIAIAI Consulting</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 2rem; background: #f8f9fa; }
            .container { max-width: 600px; margin: 0 auto; text-align: center; }
            h1 { color: #1f2937; margin-bottom: 1rem; }
            p { color: #6b7280; margin-bottom: 2rem; }
            .btn { background: #3A86FF; color: white; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 8px; display: inline-block; }
            .btn:hover { background: #2563eb; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>404 - Página No Encontrada</h1>
            <p>El archivo solicitado <code>${filePath}</code> no fue encontrado.</p>
            <a href="/" class="btn">Volver al Inicio</a>
        </div>
    </body>
    </html>
  `);
};

// 500 handler
const serve500 = (res, error) => {
  logger.error(`Server error: ${error.message}`);
  res.writeHead(500, { 
    'Content-Type': 'text/html; charset=utf-8',
    ...securityHeaders
  });
  res.end(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>500 - Error del Servidor | AIAIAI Consulting</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 2rem; background: #f8f9fa; }
            .container { max-width: 600px; margin: 0 auto; text-align: center; }
            h1 { color: #ef4444; margin-bottom: 1rem; }
            p { color: #6b7280; margin-bottom: 2rem; }
            .btn { background: #3A86FF; color: white; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 8px; display: inline-block; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>500 - Error del Servidor</h1>
            <p>Ha ocurrido un error interno del servidor.</p>
            <a href="/" class="btn">Volver al Inicio</a>
        </div>
    </body>
    </html>
  `);
};

// Main server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // Log request
  logger.info(`${req.method} ${pathname} - ${req.headers['user-agent'] || 'Unknown'}`);
  
  // API routes
  if (pathname.startsWith('/api/')) {
    apiHandler(req, res);
    return;
  }
  
  // Static file serving
  let filePath = '.' + pathname;
  
  // Default to index.html for root
  if (filePath === './') {
    filePath = './index.html';
  }
  
  // Serve file
  serveFile(filePath, res);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

// Start server
server.listen(PORT, HOST, () => {
  logger.info(`🚀 AIAIAI Consulting Server running at http://${HOST}:${PORT}`);
  logger.info(`📱 Dashboard: http://${HOST}:${PORT}/index.html`);
  logger.info(`🌐 Landing Page: http://${HOST}:${PORT}/landing.html`);
  logger.info(`📊 API Endpoints: http://${HOST}:${PORT}/api/v1/`);
  logger.info(`🔒 Security headers enabled`);
  logger.info(`📊 Press Ctrl+C to stop the server`);
});
