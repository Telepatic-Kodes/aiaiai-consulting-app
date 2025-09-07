import React from 'react';
import { Button } from './Button';
import { Modal } from './Modal';
import { LoadingSpinner } from './LoadingSpinner';
import { 
  Download, 
  FileText, 
  FileSpreadsheet, 
  File, 
  FileImage 
} from 'lucide-react';
import { exportWithProgress, ExportFormat } from '@/lib/export';
import { notifications } from '@/lib/notifications';

interface ExportButtonProps {
  data: any[];
  filename?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Export Button Component
 * 
 * Features:
 * - Multiple export formats
 * - Progress indication
 * - Error handling
 * - Professional UI
 */
export function ExportButton({
  data,
  filename = 'export',
  className,
  variant = 'outline',
  size = 'md'
}: ExportButtonProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);
  const [exportProgress, setExportProgress] = React.useState(0);
  const [exportingFormat, setExportingFormat] = React.useState<ExportFormat | null>(null);

  const exportFormats = [
    {
      format: 'csv' as ExportFormat,
      label: 'CSV',
      description: 'Archivo de valores separados por comas',
      icon: FileText,
      color: 'text-green-600'
    },
    {
      format: 'excel' as ExportFormat,
      label: 'Excel',
      description: 'Hoja de cálculo de Microsoft Excel',
      icon: FileSpreadsheet,
      color: 'text-green-600'
    },
    {
      format: 'pdf' as ExportFormat,
      label: 'PDF',
      description: 'Documento PDF para impresión',
      icon: FileImage,
      color: 'text-red-600'
    },
    {
      format: 'json' as ExportFormat,
      label: 'JSON',
      description: 'Formato de datos estructurados',
      icon: File,
      color: 'text-blue-600'
    }
  ];

  const handleExport = async (format: ExportFormat) => {
    if (data.length === 0) {
      notifications.warning('Sin datos', 'No hay datos para exportar');
      return;
    }

    setIsExporting(true);
    setExportingFormat(format);
    setExportProgress(0);

    try {
      await exportWithProgress(
        data,
        format,
        { filename: `${filename}.${format}` },
        (progress) => setExportProgress(progress)
      );

      notifications.success(
        'Exportación exitosa',
        `Los datos han sido exportados en formato ${format.toUpperCase()}`
      );
    } catch (error) {
      notifications.error(
        'Error en exportación',
        'No se pudo exportar los datos. Inténtalo de nuevo.'
      );
    } finally {
      setIsExporting(false);
      setExportingFormat(null);
      setExportProgress(0);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        leftIcon={<Download className="h-4 w-4" />}
        onClick={() => setIsModalOpen(true)}
        className={className}
        disabled={data.length === 0}
      >
        Exportar
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Exportar Datos"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Selecciona el formato en el que deseas exportar los datos:
          </p>

          {isExporting ? (
            <div className="space-y-4">
              <div className="text-center">
                <LoadingSpinner size="lg" text="Exportando datos..." />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso</span>
                  <span>{exportProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${exportProgress}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Exportando en formato {exportingFormat?.toUpperCase()}...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {exportFormats.map(({ format, label, description, icon: Icon, color }) => (
                <button
                  key={format}
                  onClick={() => handleExport(format)}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
                >
                  <div className={`h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center mr-4`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-gray-900">{label}</h3>
                    <p className="text-sm text-gray-600">{description}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={isExporting}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
