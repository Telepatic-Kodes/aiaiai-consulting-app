/**
 * Data Export System
 * 
 * Features:
 * - CSV export
 * - PDF export
 * - Excel export
 * - JSON export
 * - Professional formatting
 */

export type ExportFormat = 'csv' | 'pdf' | 'excel' | 'json';

export interface ExportOptions {
  filename?: string;
  includeHeaders?: boolean;
  dateFormat?: string;
  locale?: string;
}

/**
 * Export data to CSV format
 */
export function exportToCSV(
  data: any[],
  options: ExportOptions = {}
): void {
  const {
    filename = 'export.csv',
    includeHeaders = true,
    locale = 'es-CL'
  } = options;

  if (data.length === 0) {
    throw new Error('No data to export');
  }

  const headers = includeHeaders ? Object.keys(data[0]) : [];
  const csvContent = [
    ...(includeHeaders ? [headers.join(',')] : []),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle special characters and quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');
}

/**
 * Export data to JSON format
 */
export function exportToJSON(
  data: any[],
  options: ExportOptions = {}
): void {
  const { filename = 'export.json' } = options;

  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, filename, 'application/json');
}

/**
 * Export data to Excel format (simplified CSV with .xlsx extension)
 */
export function exportToExcel(
  data: any[],
  options: ExportOptions = {}
): void {
  const { filename = 'export.xlsx' } = options;

  // For a full implementation, you would use a library like xlsx
  // For now, we'll export as CSV with .xlsx extension
  exportToCSV(data, { ...options, filename });
}

/**
 * Export data to PDF format
 */
export function exportToPDF(
  data: any[],
  options: ExportOptions = {}
): void {
  const { filename = 'export.pdf' } = options;

  // For a full implementation, you would use a library like jsPDF
  // For now, we'll create a simple HTML table and print it
  const table = createHTMLTable(data, options);
  printHTML(table, filename);
}

/**
 * Generic file download function
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Create HTML table for PDF export
 */
function createHTMLTable(data: any[], options: ExportOptions): string {
  const { includeHeaders = true } = options;

  if (data.length === 0) {
    return '<p>No data to export</p>';
  }

  const headers = includeHeaders ? Object.keys(data[0]) : [];
  
  const tableHTML = `
    <html>
      <head>
        <title>Export Data</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
          tr:nth-child(even) { background-color: #f9f9f9; }
        </style>
      </head>
      <body>
        <h2>Datos Exportados</h2>
        <p>Fecha de exportación: ${new Date().toLocaleDateString('es-CL')}</p>
        <table>
          ${includeHeaders ? `
            <thead>
              <tr>
                ${headers.map(header => `<th>${header}</th>`).join('')}
              </tr>
            </thead>
          ` : ''}
          <tbody>
            ${data.map(row => `
              <tr>
                ${headers.map(header => `<td>${row[header] || ''}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;

  return tableHTML;
}

/**
 * Print HTML content
 */
function printHTML(html: string, filename: string): void {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }
}

/**
 * Format data for export
 */
export function formatDataForExport(
  data: any[],
  format: ExportFormat,
  options: ExportOptions = {}
): any[] {
  const { dateFormat = 'dd/MM/yyyy', locale = 'es-CL' } = options;

  return data.map(item => {
    const formattedItem = { ...item };
    
    // Format dates
    Object.keys(formattedItem).forEach(key => {
      const value = formattedItem[key];
      if (value instanceof Date) {
        formattedItem[key] = value.toLocaleDateString(locale);
      } else if (typeof value === 'string' && !isNaN(Date.parse(value))) {
        try {
          const date = new Date(value);
          formattedItem[key] = date.toLocaleDateString(locale);
        } catch (e) {
          // Keep original value if not a valid date
        }
      }
    });

    return formattedItem;
  });
}

/**
 * Export with progress callback
 */
export async function exportWithProgress(
  data: any[],
  format: ExportFormat,
  options: ExportOptions = {},
  onProgress?: (progress: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      onProgress?.(0);
      
      // Simulate processing time
      setTimeout(() => {
        onProgress?.(50);
        
        const formattedData = formatDataForExport(data, format, options);
        
        setTimeout(() => {
          onProgress?.(100);
          
          switch (format) {
            case 'csv':
              exportToCSV(formattedData, options);
              break;
            case 'json':
              exportToJSON(formattedData, options);
              break;
            case 'excel':
              exportToExcel(formattedData, options);
              break;
            case 'pdf':
              exportToPDF(formattedData, options);
              break;
            default:
              throw new Error(`Unsupported format: ${format}`);
          }
          
          resolve();
        }, 100);
      }, 100);
    } catch (error) {
      reject(error);
    }
  });
}
