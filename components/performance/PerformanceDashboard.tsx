import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Activity, 
  Zap, 
  Database, 
  Globe,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  RefreshCw,
  Trash2
} from 'lucide-react';
import { 
  performanceMonitor, 
  analyzeBundle, 
  cacheManager, 
  getMemoryUsage,
  getPerformanceRecommendations 
} from '@/lib/performance';

/**
 * Performance Dashboard Component
 * 
 * Features:
 * - Real-time performance metrics
 * - Bundle analysis
 * - Memory usage monitoring
 * - Performance recommendations
 * - Cache management
 * - Professional interface
 */
export function PerformanceDashboard() {
  const [metrics, setMetrics] = React.useState<any>({});
  const [bundleAnalysis, setBundleAnalysis] = React.useState<any>(null);
  const [memoryUsage, setMemoryUsage] = React.useState<any>(null);
  const [recommendations, setRecommendations] = React.useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const refreshMetrics = React.useCallback(async () => {
    setIsRefreshing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setMetrics(performanceMonitor.getMetrics());
    setBundleAnalysis(analyzeBundle());
    setMemoryUsage(getMemoryUsage());
    setRecommendations(getPerformanceRecommendations());
    
    setIsRefreshing(false);
  }, []);

  React.useEffect(() => {
    refreshMetrics();
    
    // Refresh metrics every 30 seconds
    const interval = setInterval(refreshMetrics, 30000);
    
    return () => clearInterval(interval);
  }, [refreshMetrics]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms.toFixed(0)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const getPerformanceColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return 'text-green-600';
    if (value <= thresholds.warning) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleClearCache = () => {
    cacheManager.clear();
    refreshMetrics();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard de Rendimiento</h2>
          <p className="text-gray-600">Monitorea y optimiza el rendimiento de la aplicación</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            leftIcon={<Trash2 className="h-4 w-4" />}
            onClick={handleClearCache}
          >
            Limpiar Caché
          </Button>
          <Button
            leftIcon={<RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />}
            onClick={refreshMetrics}
            disabled={isRefreshing}
          >
            Actualizar
          </Button>
        </div>
      </div>

      {/* Core Web Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getPerformanceColor(metrics.FCP || 0, { good: 1800, warning: 3000 })}`}>
                  {formatTime(metrics.FCP || 0)}
                </div>
                <div className="text-xs text-gray-500">FCP</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-lg font-semibold text-gray-900">First Contentful Paint</div>
              <div className="text-sm text-gray-600">Tiempo hasta el primer contenido</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Zap className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getPerformanceColor(metrics.LCP || 0, { good: 2500, warning: 4000 })}`}>
                  {formatTime(metrics.LCP || 0)}
                </div>
                <div className="text-xs text-gray-500">LCP</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-lg font-semibold text-gray-900">Largest Contentful Paint</div>
              <div className="text-sm text-gray-600">Tiempo hasta el contenido más grande</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getPerformanceColor(metrics.FID || 0, { good: 100, warning: 300 })}`}>
                  {formatTime(metrics.FID || 0)}
                </div>
                <div className="text-xs text-gray-500">FID</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-lg font-semibold text-gray-900">First Input Delay</div>
              <div className="text-sm text-gray-600">Tiempo de respuesta a la primera interacción</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getPerformanceColor(metrics.CLS || 0, { good: 0.1, warning: 0.25 })}`}>
                  {(metrics.CLS || 0).toFixed(3)}
                </div>
                <div className="text-xs text-gray-500">CLS</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-lg font-semibold text-gray-900">Cumulative Layout Shift</div>
              <div className="text-sm text-gray-600">Estabilidad visual</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bundle Analysis and Memory Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bundle Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-primary-600" />
              <span>Análisis de Bundle</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {bundleAnalysis ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      {formatBytes(bundleAnalysis.jsSize)}
                    </div>
                    <div className="text-sm text-blue-700">JavaScript</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      {formatBytes(bundleAnalysis.cssSize)}
                    </div>
                    <div className="text-sm text-green-700">CSS</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-lg font-bold text-yellow-600">
                      {formatBytes(bundleAnalysis.imageSize)}
                    </div>
                    <div className="text-sm text-yellow-700">Imágenes</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">
                      {formatBytes(bundleAnalysis.fontSize)}
                    </div>
                    <div className="text-sm text-purple-700">Fuentes</div>
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-gray-900">
                    {formatBytes(bundleAnalysis.totalSize)}
                  </div>
                  <div className="text-sm text-gray-600">Tamaño Total</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Database className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No hay datos de bundle disponibles</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Memory Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-primary-600" />
              <span>Uso de Memoria</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {memoryUsage ? (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Memoria Usada</span>
                    <span className="font-medium">{formatBytes(memoryUsage.used)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${memoryUsage.usage}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Total</div>
                    <div className="font-medium">{formatBytes(memoryUsage.total)}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Límite</div>
                    <div className="font-medium">{formatBytes(memoryUsage.limit)}</div>
                  </div>
                </div>
                
                <div className={`text-center p-3 rounded-lg ${
                  memoryUsage.usage > 80 ? 'bg-red-50 text-red-700' :
                  memoryUsage.usage > 60 ? 'bg-yellow-50 text-yellow-700' :
                  'bg-green-50 text-green-700'
                }`}>
                  <div className="text-lg font-bold">
                    {memoryUsage.usage.toFixed(1)}%
                  </div>
                  <div className="text-sm">Uso de Memoria</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Globe className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No hay datos de memoria disponibles</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-primary-600" />
            <span>Recomendaciones de Rendimiento</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recommendations.length > 0 ? (
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    rec.type === 'warning' ? 'border-yellow-400 bg-yellow-50' :
                    rec.type === 'error' ? 'border-red-400 bg-red-50' :
                    'border-blue-400 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        {rec.type === 'warning' ? (
                          <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        )}
                        <h4 className="text-sm font-medium text-gray-900">
                          {rec.message}
                        </h4>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      {rec.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-300" />
              <p>¡Excelente! No se encontraron problemas de rendimiento</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
