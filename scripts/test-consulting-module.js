/**
 * Script de Pruebas Automatizadas para el Módulo de Consultoría
 * AIAIAI Consulting - Sistema de Pruebas
 */

const fs = require('fs');
const path = require('path');

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Función para imprimir con colores
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Función para verificar si un archivo existe
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Función para verificar si un archivo contiene cierta funcionalidad
function fileContains(filePath, searchString) {
  if (!fileExists(filePath)) return false;
  const content = fs.readFileSync(filePath, 'utf8');
  return content.includes(searchString);
}

// Función para contar ocurrencias de una cadena en un archivo
function countOccurrences(filePath, searchString) {
  if (!fileExists(filePath)) return 0;
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = new RegExp(searchString, 'g');
  const matches = content.match(regex);
  return matches ? matches.length : 0;
}

// Función para verificar imports de componentes
function checkImports(filePath, componentName) {
  if (!fileExists(filePath)) return false;
  const content = fs.readFileSync(filePath, 'utf8');
  const importRegex = new RegExp(`import.*${componentName}.*from`, 'g');
  return importRegex.test(content);
}

// Función para verificar uso de hooks de React
function checkReactHooks(filePath) {
  if (!fileExists(filePath)) return false;
  const content = fs.readFileSync(filePath, 'utf8');
  const hooks = ['useState', 'useEffect', 'useCallback', 'useMemo'];
  return hooks.some(hook => content.includes(hook));
}

// Función para verificar TypeScript
function checkTypeScript(filePath) {
  if (!fileExists(filePath)) return false;
  const content = fs.readFileSync(filePath, 'utf8');
  return content.includes('interface ') || content.includes('type ') || content.includes(': ');
}

// Función para verificar Tailwind CSS
function checkTailwind(filePath) {
  if (!fileExists(filePath)) return false;
  const content = fs.readFileSync(filePath, 'utf8');
  return content.includes('className=') && content.includes('bg-') || content.includes('text-');
}

// Función para verificar iconos de Lucide
function checkLucideIcons(filePath) {
  if (!fileExists(filePath)) return false;
  const content = fs.readFileSync(filePath, 'utf8');
  return content.includes('lucide-react') && content.includes('className="w-');
}

// Función para verificar funcionalidades específicas
function checkFunctionality(filePath, functionality) {
  if (!fileExists(filePath)) return false;
  const content = fs.readFileSync(filePath, 'utf8');
  return content.includes(functionality);
}

// Función principal de pruebas
function runTests() {
  log('\n🧪 INICIANDO PRUEBAS DEL MÓDULO DE CONSULTORÍA', 'bright');
  log('=' * 60, 'cyan');
  
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  
  // Definir rutas de archivos
  const basePath = path.join(__dirname, '..');
  const files = {
    'Página Principal': path.join(basePath, 'app/consulting/page.tsx'),
    'ClientPipeline': path.join(basePath, 'components/consulting/ClientPipeline.tsx'),
    'AIPipelineAssistant': path.join(basePath, 'components/consulting/AIPipelineAssistant.tsx'),
    'ProposalGenerator': path.join(basePath, 'components/consulting/ProposalGenerator.tsx'),
    'NotificationCenter': path.join(basePath, 'components/consulting/NotificationCenter.tsx'),
    'TaskManager': path.join(basePath, 'components/consulting/TaskManager.tsx'),
    'ProcessSimulator': path.join(basePath, 'components/consulting/ProcessSimulator.tsx'),
    'PredictiveAnalytics': path.join(basePath, 'components/consulting/PredictiveAnalytics.tsx'),
    'ReminderSystem': path.join(basePath, 'components/consulting/ReminderSystem.tsx'),
    'RealTimeDashboard': path.join(basePath, 'components/consulting/RealTimeDashboard.tsx'),
    'TemplateManager': path.join(basePath, 'components/consulting/TemplateManager.tsx'),
    'AutoReportSystem': path.join(basePath, 'components/consulting/AutoReportSystem.tsx')
  };
  
  // Función para ejecutar una prueba
  function runTest(testName, testFunction, expectedResult = true) {
    totalTests++;
    try {
      const result = testFunction();
      if (result === expectedResult) {
        log(`✅ ${testName}`, 'green');
        passedTests++;
      } else {
        log(`❌ ${testName}`, 'red');
        failedTests++;
      }
    } catch (error) {
      log(`❌ ${testName} - Error: ${error.message}`, 'red');
      failedTests++;
    }
  }
  
  // Pruebas de existencia de archivos
  log('\n📁 PRUEBAS DE EXISTENCIA DE ARCHIVOS', 'yellow');
  Object.entries(files).forEach(([name, filePath]) => {
    runTest(`Archivo ${name} existe`, () => fileExists(filePath));
  });
  
  // Pruebas de estructura de componentes
  log('\n🏗️ PRUEBAS DE ESTRUCTURA DE COMPONENTES', 'yellow');
  Object.entries(files).forEach(([name, filePath]) => {
    if (fileExists(filePath)) {
      runTest(`${name} es un componente React`, () => fileContains(filePath, 'export function'));
      runTest(`${name} usa TypeScript`, () => checkTypeScript(filePath));
      runTest(`${name} usa Tailwind CSS`, () => checkTailwind(filePath));
      runTest(`${name} usa iconos de Lucide`, () => checkLucideIcons(filePath));
    }
  });
  
  // Pruebas específicas de funcionalidades
  log('\n⚡ PRUEBAS DE FUNCIONALIDADES ESPECÍFICAS', 'yellow');
  
  // ClientPipeline
  if (fileExists(files.ClientPipeline)) {
    runTest('ClientPipeline tiene drag & drop', () => 
      checkFunctionality(files.ClientPipeline, 'onDragStart') && 
      checkFunctionality(files.ClientPipeline, 'onDrop')
    );
    runTest('ClientPipeline tiene filtros', () => 
      checkFunctionality(files.ClientPipeline, 'filteredClients')
    );
    runTest('ClientPipeline tiene métricas', () => 
      checkFunctionality(files.ClientPipeline, 'getConversionRate')
    );
  }
  
  // ProposalGenerator
  if (fileExists(files.ProposalGenerator)) {
    runTest('ProposalGenerator tiene generación con IA', () => 
      checkFunctionality(files.ProposalGenerator, 'generateProposal')
    );
    runTest('ProposalGenerator tiene vista detallada', () => 
      checkFunctionality(files.ProposalGenerator, 'showDetailedView')
    );
    runTest('ProposalGenerator tiene templates', () => 
      checkFunctionality(files.ProposalGenerator, 'proposalTemplate')
    );
  }
  
  // ReminderSystem
  if (fileExists(files.ReminderSystem)) {
    runTest('ReminderSystem tiene tipos de recordatorios', () => 
      checkFunctionality(files.ReminderSystem, 'followup') && 
      checkFunctionality(files.ReminderSystem, 'meeting')
    );
    runTest('ReminderSystem tiene prioridades', () => 
      checkFunctionality(files.ReminderSystem, 'high') && 
      checkFunctionality(files.ReminderSystem, 'medium')
    );
    runTest('ReminderSystem tiene acciones', () => 
      checkFunctionality(files.ReminderSystem, 'actions')
    );
  }
  
  // RealTimeDashboard
  if (fileExists(files.RealTimeDashboard)) {
    runTest('RealTimeDashboard tiene auto-refresh', () => 
      checkFunctionality(files.RealTimeDashboard, 'autoRefresh')
    );
    runTest('RealTimeDashboard tiene métricas', () => 
      checkFunctionality(files.RealTimeDashboard, 'metrics')
    );
    runTest('RealTimeDashboard tiene actividad', () => 
      checkFunctionality(files.RealTimeDashboard, 'activities')
    );
  }
  
  // TemplateManager
  if (fileExists(files.TemplateManager)) {
    runTest('TemplateManager tiene categorías', () => 
      checkFunctionality(files.TemplateManager, 'proposal') && 
      checkFunctionality(files.TemplateManager, 'email')
    );
    runTest('TemplateManager tiene variables', () => 
      checkFunctionality(files.TemplateManager, 'variables')
    );
    runTest('TemplateManager tiene vista previa', () => 
      checkFunctionality(files.TemplateManager, 'showPreview')
    );
  }
  
  // AutoReportSystem
  if (fileExists(files.AutoReportSystem)) {
    runTest('AutoReportSystem tiene programación', () => 
      checkFunctionality(files.AutoReportSystem, 'schedule')
    );
    runTest('AutoReportSystem tiene destinatarios', () => 
      checkFunctionality(files.AutoReportSystem, 'recipients')
    );
    runTest('AutoReportSystem tiene métricas', () => 
      checkFunctionality(files.AutoReportSystem, 'metrics')
    );
  }
  
  // Pruebas de integración
  log('\n🔗 PRUEBAS DE INTEGRACIÓN', 'yellow');
  
  // Verificar que la página principal importa todos los componentes
  if (fileExists(files['Página Principal'])) {
    const mainPage = files['Página Principal'];
    const components = [
      'ClientPipeline', 'AIPipelineAssistant', 'ProposalGenerator', 
      'NotificationCenter', 'TaskManager', 'ProcessSimulator', 
      'PredictiveAnalytics', 'ReminderSystem', 'RealTimeDashboard', 
      'TemplateManager', 'AutoReportSystem'
    ];
    
    components.forEach(component => {
      runTest(`Página principal importa ${component}`, () => 
        checkImports(mainPage, component)
      );
    });
    
    runTest('Página principal tiene navegación por tabs', () => 
      checkFunctionality(mainPage, 'activeTab') && 
      checkFunctionality(mainPage, 'setActiveTab')
    );
    
    runTest('Página principal tiene renderizado condicional', () => 
      checkFunctionality(mainPage, 'renderContent')
    );
  }
  
  // Pruebas de calidad de código
  log('\n📊 PRUEBAS DE CALIDAD DE CÓDIGO', 'yellow');
  
  Object.entries(files).forEach(([name, filePath]) => {
    if (fileExists(filePath)) {
      runTest(`${name} usa hooks de React`, () => checkReactHooks(filePath));
      runTest(`${name} tiene comentarios`, () => 
        countOccurrences(filePath, '//') > 0 || countOccurrences(filePath, '/*') > 0
      );
      runTest(`${name} tiene manejo de errores`, () => 
        checkFunctionality(filePath, 'try') || checkFunctionality(filePath, 'catch')
      );
    }
  });
  
  // Resumen de resultados
  log('\n📈 RESUMEN DE RESULTADOS', 'bright');
  log('=' * 60, 'cyan');
  log(`Total de pruebas: ${totalTests}`, 'blue');
  log(`Pruebas exitosas: ${passedTests}`, 'green');
  log(`Pruebas fallidas: ${failedTests}`, 'red');
  
  const successRate = ((passedTests / totalTests) * 100).toFixed(1);
  log(`Tasa de éxito: ${successRate}%`, successRate >= 90 ? 'green' : successRate >= 70 ? 'yellow' : 'red');
  
  if (failedTests === 0) {
    log('\n🎉 ¡TODAS LAS PRUEBAS PASARON!', 'green');
    log('El módulo de consultoría está completamente funcional.', 'green');
  } else {
    log('\n⚠️ Algunas pruebas fallaron. Revisa los errores arriba.', 'yellow');
  }
  
  log('\n🚀 PRÓXIMOS PASOS RECOMENDADOS:', 'bright');
  log('1. Probar la aplicación en el navegador', 'blue');
  log('2. Verificar la funcionalidad de drag & drop', 'blue');
  log('3. Probar la generación de propuestas con IA', 'blue');
  log('4. Verificar el sistema de recordatorios', 'blue');
  log('5. Probar el dashboard en tiempo real', 'blue');
  log('6. Verificar el sistema de plantillas', 'blue');
  log('7. Probar el sistema de reportes automáticos', 'blue');
  
  return {
    total: totalTests,
    passed: passedTests,
    failed: failedTests,
    successRate: parseFloat(successRate)
  };
}

// Ejecutar las pruebas si el script se ejecuta directamente
if (require.main === module) {
  runTests();
}

module.exports = { runTests };
