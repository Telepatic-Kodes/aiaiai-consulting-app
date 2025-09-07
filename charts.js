/**
 * AIAIAI Consulting - Advanced Charts System
 * Sistema de visualizaciones de datos avanzado
 */

class ChartsManager {
    constructor() {
        this.charts = new Map();
        this.chartConfigs = {
            revenue: {
                type: 'line',
                data: [
                    { month: 'Jul', value: 45000 },
                    { month: 'Ago', value: 52000 },
                    { month: 'Sep', value: 48000 },
                    { month: 'Oct', value: 61000 },
                    { month: 'Nov', value: 58000 },
                    { month: 'Dic', value: 72000 }
                ],
                colors: ['#3A86FF', '#FFD700'],
                options: {
                    showGrid: true,
                    showLabels: true,
                    animated: true
                }
            },
            agents: {
                type: 'bar',
                data: [
                    { name: 'Lead Scorer', value: 85, color: '#10b981' },
                    { name: 'Proposal Builder', value: 95, color: '#3b82f6' },
                    { name: 'Meeting Summarizer', value: 88, color: '#f59e0b' },
                    { name: 'CRM Updater', value: 92, color: '#8b5cf6' },
                    { name: 'Follow-up Scheduler', value: 0, color: '#6b7280' },
                    { name: 'Invoice Generator', value: 0, color: '#6b7280' }
                ],
                options: {
                    showValues: true,
                    showLabels: true,
                    animated: true
                }
            },
            satisfaction: {
                type: 'donut',
                data: [
                    { label: 'Excelente (5)', value: 45, color: '#10b981' },
                    { label: 'Muy Bueno (4)', value: 35, color: '#34d399' },
                    { label: 'Bueno (3)', value: 15, color: '#fbbf24' },
                    { label: 'Regular (2)', value: 4, color: '#f59e0b' },
                    { label: 'Malo (1)', value: 1, color: '#ef4444' }
                ],
                options: {
                    showLegend: true,
                    showValues: true,
                    animated: true
                }
            },
            projects: {
                type: 'pie',
                data: [
                    { label: 'Activos', value: 12, color: '#10b981' },
                    { label: 'Completados', value: 8, color: '#3b82f6' },
                    { label: 'En Pausa', value: 2, color: '#f59e0b' },
                    { label: 'Planificación', value: 3, color: '#6b7280' }
                ],
                options: {
                    showLegend: true,
                    showValues: true,
                    animated: true
                }
            }
        };
        this.init();
    }

    init() {
        this.addChartStyles();
    }

    addChartStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .chart-container {
                position: relative;
                width: 100%;
                height: 300px;
                background: var(--surface);
                border-radius: 12px;
                padding: 1rem;
                box-shadow: 0 2px 10px var(--shadow);
            }

            .chart-svg {
                width: 100%;
                height: 100%;
            }

            .chart-line {
                fill: none;
                stroke-width: 3;
                stroke-linecap: round;
                stroke-linejoin: round;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
            }

            .chart-bar {
                transition: all 0.3s ease;
                cursor: pointer;
            }

            .chart-bar:hover {
                opacity: 0.8;
                transform: scaleY(1.05);
            }

            .chart-slice {
                transition: all 0.3s ease;
                cursor: pointer;
            }

            .chart-slice:hover {
                opacity: 0.8;
                transform: scale(1.05);
            }

            .chart-grid {
                stroke: var(--border);
                stroke-width: 1;
                opacity: 0.3;
            }

            .chart-axis {
                stroke: var(--text-secondary);
                stroke-width: 1;
            }

            .chart-label {
                font-size: 0.75rem;
                fill: var(--text-secondary);
                text-anchor: middle;
            }

            .chart-value {
                font-size: 0.875rem;
                font-weight: 600;
                fill: var(--text-primary);
                text-anchor: middle;
            }

            .chart-legend {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                margin-top: 1rem;
                justify-content: center;
            }

            .chart-legend-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.875rem;
                color: var(--text-secondary);
            }

            .chart-legend-color {
                width: 12px;
                height: 12px;
                border-radius: 2px;
            }

            .chart-tooltip {
                position: absolute;
                background: var(--surface);
                border: 1px solid var(--border);
                border-radius: 6px;
                padding: 0.5rem;
                font-size: 0.875rem;
                color: var(--text-primary);
                box-shadow: 0 4px 12px var(--shadow);
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.2s ease;
                z-index: 1000;
            }

            .chart-tooltip.show {
                opacity: 1;
            }

            @keyframes chartDraw {
                from {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                }
                to {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 0;
                }
            }

            .chart-animated {
                animation: chartDraw 2s ease-in-out;
            }
        `;
        document.head.appendChild(style);
    }

    createChart(containerId, chartType, data, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const config = this.chartConfigs[chartType] || { type: chartType, data, options };
        const chartId = `${containerId}-${Date.now()}`;

        // Clear existing chart
        container.innerHTML = '';

        // Create chart container
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        chartContainer.id = chartId;

        // Create SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.className = 'chart-svg';
        svg.setAttribute('viewBox', '0 0 400 300');

        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'chart-tooltip';
        chartContainer.appendChild(tooltip);

        // Render based on type
        switch (config.type) {
            case 'line':
                this.renderLineChart(svg, config.data, config.options, tooltip);
                break;
            case 'bar':
                this.renderBarChart(svg, config.data, config.options, tooltip);
                break;
            case 'pie':
                this.renderPieChart(svg, config.data, config.options, tooltip);
                break;
            case 'donut':
                this.renderDonutChart(svg, config.data, config.options, tooltip);
                break;
        }

        chartContainer.appendChild(svg);
        container.appendChild(chartContainer);

        // Store chart reference
        this.charts.set(chartId, {
            type: config.type,
            data: config.data,
            options: config.options,
            container: chartContainer
        });

        return chartId;
    }

    renderLineChart(svg, data, options, tooltip) {
        const width = 400;
        const height = 300;
        const padding = 40;
        const chartWidth = width - 2 * padding;
        const chartHeight = height - 2 * padding;

        // Calculate scales
        const maxValue = Math.max(...data.map(d => d.value));
        const xScale = chartWidth / (data.length - 1);
        const yScale = chartHeight / maxValue;

        // Create grid
        if (options.showGrid) {
            for (let i = 0; i <= 5; i++) {
                const y = padding + (chartHeight / 5) * i;
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', padding);
                line.setAttribute('y1', y);
                line.setAttribute('x2', width - padding);
                line.setAttribute('y2', y);
                line.className = 'chart-grid';
                svg.appendChild(line);
            }
        }

        // Create line path
        const pathData = data.map((point, index) => {
            const x = padding + index * xScale;
            const y = height - padding - point.value * yScale;
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.className = 'chart-line chart-animated';
        path.setAttribute('stroke', '#3A86FF');
        svg.appendChild(path);

        // Create data points
        data.forEach((point, index) => {
            const x = padding + index * xScale;
            const y = height - padding - point.value * yScale;

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', 4);
            circle.setAttribute('fill', '#3A86FF');
            circle.setAttribute('stroke', 'white');
            circle.setAttribute('stroke-width', 2);
            circle.style.cursor = 'pointer';

            // Add hover effect
            circle.addEventListener('mouseenter', (e) => {
                tooltip.innerHTML = `
                    <div><strong>${point.month}</strong></div>
                    <div>$${point.value.toLocaleString()}</div>
                `;
                tooltip.style.left = e.pageX + 10 + 'px';
                tooltip.style.top = e.pageY - 10 + 'px';
                tooltip.classList.add('show');
            });

            circle.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });

            svg.appendChild(circle);

            // Add labels
            if (options.showLabels) {
                const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                label.setAttribute('x', x);
                label.setAttribute('y', height - padding + 20);
                label.className = 'chart-label';
                label.textContent = point.month;
                svg.appendChild(label);
            }
        });
    }

    renderBarChart(svg, data, options, tooltip) {
        const width = 400;
        const height = 300;
        const padding = 40;
        const chartWidth = width - 2 * padding;
        const chartHeight = height - 2 * padding;

        const maxValue = Math.max(...data.map(d => d.value));
        const barWidth = chartWidth / data.length * 0.8;
        const barSpacing = chartWidth / data.length * 0.2;

        data.forEach((item, index) => {
            const x = padding + index * (chartWidth / data.length) + barSpacing / 2;
            const barHeight = (item.value / maxValue) * chartHeight;
            const y = height - padding - barHeight;

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', x);
            rect.setAttribute('y', y);
            rect.setAttribute('width', barWidth);
            rect.setAttribute('height', barHeight);
            rect.setAttribute('fill', item.color || '#3A86FF');
            rect.className = 'chart-bar';
            rect.style.animationDelay = `${index * 0.1}s`;

            // Add hover effect
            rect.addEventListener('mouseenter', (e) => {
                tooltip.innerHTML = `
                    <div><strong>${item.name}</strong></div>
                    <div>${item.value}% precisión</div>
                `;
                tooltip.style.left = e.pageX + 10 + 'px';
                tooltip.style.top = e.pageY - 10 + 'px';
                tooltip.classList.add('show');
            });

            rect.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });

            svg.appendChild(rect);

            // Add value labels
            if (options.showValues) {
                const valueLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                valueLabel.setAttribute('x', x + barWidth / 2);
                valueLabel.setAttribute('y', y - 5);
                valueLabel.className = 'chart-value';
                valueLabel.textContent = item.value + '%';
                svg.appendChild(valueLabel);
            }

            // Add name labels
            if (options.showLabels) {
                const nameLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                nameLabel.setAttribute('x', x + barWidth / 2);
                nameLabel.setAttribute('y', height - padding + 20);
                nameLabel.className = 'chart-label';
                nameLabel.textContent = item.name.split(' ')[0]; // First word only
                svg.appendChild(nameLabel);
            }
        });
    }

    renderPieChart(svg, data, options, tooltip) {
        const width = 400;
        const height = 300;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 40;

        const total = data.reduce((sum, item) => sum + item.value, 0);
        let currentAngle = 0;

        data.forEach((item, index) => {
            const sliceAngle = (item.value / total) * 2 * Math.PI;
            const endAngle = currentAngle + sliceAngle;

            const path = this.createPieSlice(centerX, centerY, radius, currentAngle, endAngle);
            const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathElement.setAttribute('d', path);
            pathElement.setAttribute('fill', item.color || '#3A86FF');
            pathElement.className = 'chart-slice';
            pathElement.style.animationDelay = `${index * 0.1}s`;

            // Add hover effect
            pathElement.addEventListener('mouseenter', (e) => {
                tooltip.innerHTML = `
                    <div><strong>${item.label}</strong></div>
                    <div>${item.value} (${Math.round((item.value / total) * 100)}%)</div>
                `;
                tooltip.style.left = e.pageX + 10 + 'px';
                tooltip.style.top = e.pageY - 10 + 'px';
                tooltip.classList.add('show');
            });

            pathElement.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });

            svg.appendChild(pathElement);
            currentAngle = endAngle;
        });

        // Add legend
        if (options.showLegend) {
            this.addLegend(svg, data, width, height);
        }
    }

    renderDonutChart(svg, data, options, tooltip) {
        const width = 400;
        const height = 300;
        const centerX = width / 2;
        const centerY = height / 2;
        const outerRadius = Math.min(width, height) / 2 - 40;
        const innerRadius = outerRadius * 0.6;

        const total = data.reduce((sum, item) => sum + item.value, 0);
        let currentAngle = 0;

        data.forEach((item, index) => {
            const sliceAngle = (item.value / total) * 2 * Math.PI;
            const endAngle = currentAngle + sliceAngle;

            const path = this.createDonutSlice(centerX, centerY, outerRadius, innerRadius, currentAngle, endAngle);
            const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathElement.setAttribute('d', path);
            pathElement.setAttribute('fill', item.color || '#3A86FF');
            pathElement.className = 'chart-slice';
            pathElement.style.animationDelay = `${index * 0.1}s`;

            // Add hover effect
            pathElement.addEventListener('mouseenter', (e) => {
                tooltip.innerHTML = `
                    <div><strong>${item.label}</strong></div>
                    <div>${item.value}% (${Math.round((item.value / total) * 100)}%)</div>
                `;
                tooltip.style.left = e.pageX + 10 + 'px';
                tooltip.style.top = e.pageY - 10 + 'px';
                tooltip.classList.add('show');
            });

            pathElement.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });

            svg.appendChild(pathElement);
            currentAngle = endAngle;
        });

        // Add center text
        const centerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        centerText.setAttribute('x', centerX);
        centerText.setAttribute('y', centerY - 5);
        centerText.setAttribute('text-anchor', 'middle');
        centerText.className = 'chart-value';
        centerText.textContent = '4.7';
        svg.appendChild(centerText);

        const centerSubtext = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        centerSubtext.setAttribute('x', centerX);
        centerSubtext.setAttribute('y', centerY + 15);
        centerSubtext.setAttribute('text-anchor', 'middle');
        centerSubtext.className = 'chart-label';
        centerSubtext.textContent = 'Promedio';
        svg.appendChild(centerSubtext);

        // Add legend
        if (options.showLegend) {
            this.addLegend(svg, data, width, height);
        }
    }

    createPieSlice(centerX, centerY, radius, startAngle, endAngle) {
        const start = this.polarToCartesian(centerX, centerY, radius, endAngle);
        const end = this.polarToCartesian(centerX, centerY, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';

        return [
            'M', centerX, centerY,
            'L', start.x, start.y,
            'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
            'Z'
        ].join(' ');
    }

    createDonutSlice(centerX, centerY, outerRadius, innerRadius, startAngle, endAngle) {
        const startOuter = this.polarToCartesian(centerX, centerY, outerRadius, endAngle);
        const endOuter = this.polarToCartesian(centerX, centerY, outerRadius, startAngle);
        const startInner = this.polarToCartesian(centerX, centerY, innerRadius, endAngle);
        const endInner = this.polarToCartesian(centerX, centerY, innerRadius, startAngle);
        const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';

        return [
            'M', startOuter.x, startOuter.y,
            'A', outerRadius, outerRadius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
            'L', endInner.x, endInner.y,
            'A', innerRadius, innerRadius, 0, largeArcFlag, 1, startInner.x, startInner.y,
            'Z'
        ].join(' ');
    }

    polarToCartesian(centerX, centerY, radius, angleInRadians) {
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    addLegend(svg, data, width, height) {
        const legend = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        legend.setAttribute('transform', `translate(${width - 120}, 20)`);

        data.forEach((item, index) => {
            const legendItem = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            legendItem.setAttribute('transform', `translate(0, ${index * 20})`);

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('width', 12);
            rect.setAttribute('height', 12);
            rect.setAttribute('fill', item.color || '#3A86FF');
            legendItem.appendChild(rect);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', 18);
            text.setAttribute('y', 9);
            text.setAttribute('font-size', '12');
            text.setAttribute('fill', 'var(--text-secondary)');
            text.textContent = item.label;
            legendItem.appendChild(text);

            legend.appendChild(legendItem);
        });

        svg.appendChild(legend);
    }

    // Public methods
    updateChart(chartId, newData) {
        const chart = this.charts.get(chartId);
        if (!chart) return;

        chart.data = newData;
        const container = chart.container;
        const chartType = chart.type;
        const options = chart.options;

        // Re-render chart
        container.innerHTML = '';
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.className = 'chart-svg';
        svg.setAttribute('viewBox', '0 0 400 300');

        const tooltip = document.createElement('div');
        tooltip.className = 'chart-tooltip';
        container.appendChild(tooltip);

        switch (chartType) {
            case 'line':
                this.renderLineChart(svg, newData, options, tooltip);
                break;
            case 'bar':
                this.renderBarChart(svg, newData, options, tooltip);
                break;
            case 'pie':
                this.renderPieChart(svg, newData, options, tooltip);
                break;
            case 'donut':
                this.renderDonutChart(svg, newData, options, tooltip);
                break;
        }

        container.appendChild(svg);
    }

    destroyChart(chartId) {
        const chart = this.charts.get(chartId);
        if (chart) {
            chart.container.remove();
            this.charts.delete(chartId);
        }
    }

    getChart(chartId) {
        return this.charts.get(chartId);
    }
}

// Global charts manager instance
window.chartsManager = new ChartsManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChartsManager;
}
