/**
 * AIAIAI Consulting - Loading States System
 * Sistema de estados de carga y skeleton screens
 */

class LoadingManager {
    constructor() {
        this.loadingStates = new Map();
        this.skeletonTemplates = new Map();
        this.init();
    }

    init() {
        this.createSkeletonTemplates();
        this.addLoadingStyles();
    }

    addLoadingStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Loading Overlay */
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(4px);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }

            .loading-overlay.show {
                opacity: 1;
                visibility: visible;
            }

            .loading-overlay.dark {
                background: rgba(17, 24, 39, 0.9);
            }

            .loading-content {
                text-align: center;
                color: var(--text-primary);
            }

            .loading-spinner-large {
                width: 40px;
                height: 40px;
                border: 4px solid var(--border);
                border-top: 4px solid var(--primary);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            }

            .loading-text {
                font-size: 1rem;
                font-weight: 500;
                margin-bottom: 0.5rem;
            }

            .loading-subtext {
                font-size: 0.875rem;
                color: var(--text-secondary);
            }

            /* Skeleton Components */
            .skeleton {
                background: linear-gradient(90deg, var(--border) 25%, var(--background) 50%, var(--border) 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
                border-radius: 4px;
            }

            .skeleton-text {
                height: 1rem;
                margin-bottom: 0.5rem;
            }

            .skeleton-text.short {
                width: 60%;
            }

            .skeleton-text.medium {
                width: 80%;
            }

            .skeleton-text.long {
                width: 100%;
            }

            .skeleton-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }

            .skeleton-button {
                height: 36px;
                width: 100px;
                border-radius: 6px;
            }

            .skeleton-card {
                padding: 1.5rem;
                border-radius: 12px;
                background: var(--surface);
                border: 1px solid var(--border);
            }

            .skeleton-chart {
                height: 200px;
                border-radius: 8px;
            }

            /* Skeleton Grid */
            .skeleton-grid {
                display: grid;
                gap: 1rem;
            }

            .skeleton-grid-2 {
                grid-template-columns: 1fr 1fr;
            }

            .skeleton-grid-3 {
                grid-template-columns: 1fr 1fr 1fr;
            }

            .skeleton-grid-4 {
                grid-template-columns: repeat(4, 1fr);
            }

            /* Loading States for Components */
            .component-loading {
                position: relative;
                overflow: hidden;
            }

            .component-loading::after {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                animation: shimmer 1.5s infinite;
            }

            .component-loading.dark::after {
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            }

            @keyframes shimmer {
                0% { left: -100%; }
                100% { left: 100%; }
            }

            /* Button Loading States */
            .btn-loading {
                position: relative;
                color: transparent !important;
            }

            .btn-loading::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 16px;
                height: 16px;
                border: 2px solid transparent;
                border-top: 2px solid currentColor;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }

            /* Form Loading States */
            .form-loading {
                pointer-events: none;
                opacity: 0.6;
            }

            .form-loading .form-control {
                background: var(--background);
            }

            /* Table Loading States */
            .table-loading {
                position: relative;
            }

            .table-loading tbody tr {
                opacity: 0.5;
            }

            .table-loading::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .table-loading::after {
                content: 'Cargando datos...';
                color: var(--text-secondary);
                font-size: 0.875rem;
            }

            /* Progress Indicators */
            .progress-indicator {
                width: 100%;
                height: 4px;
                background: var(--border);
                border-radius: 2px;
                overflow: hidden;
                position: relative;
            }

            .progress-indicator::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                background: var(--primary);
                border-radius: 2px;
                animation: progress 2s ease-in-out infinite;
            }

            @keyframes progress {
                0% { width: 0%; }
                50% { width: 70%; }
                100% { width: 100%; }
            }

            /* Inline Loading */
            .inline-loading {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-secondary);
                font-size: 0.875rem;
            }

            .inline-loading .spinner {
                width: 12px;
                height: 12px;
                border: 2px solid var(--border);
                border-top: 2px solid var(--primary);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }

            /* Responsive Loading */
            @media (max-width: 768px) {
                .skeleton-grid-4 {
                    grid-template-columns: 1fr 1fr;
                }
                
                .skeleton-grid-3 {
                    grid-template-columns: 1fr;
                }
                
                .loading-overlay {
                    padding: 1rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    createSkeletonTemplates() {
        // Dashboard skeleton
        this.skeletonTemplates.set('dashboard', `
            <div class="skeleton-grid skeleton-grid-4">
                <div class="skeleton-card">
                    <div class="skeleton skeleton-text short"></div>
                    <div class="skeleton skeleton-text long"></div>
                    <div class="skeleton skeleton-text medium"></div>
                </div>
                <div class="skeleton-card">
                    <div class="skeleton skeleton-text short"></div>
                    <div class="skeleton skeleton-text long"></div>
                    <div class="skeleton skeleton-text medium"></div>
                </div>
                <div class="skeleton-card">
                    <div class="skeleton skeleton-text short"></div>
                    <div class="skeleton skeleton-text long"></div>
                    <div class="skeleton skeleton-text medium"></div>
                </div>
                <div class="skeleton-card">
                    <div class="skeleton skeleton-text short"></div>
                    <div class="skeleton skeleton-text long"></div>
                    <div class="skeleton skeleton-text medium"></div>
                </div>
            </div>
        `);

        // Agents skeleton
        this.skeletonTemplates.set('agents', `
            <div class="skeleton-grid">
                <div class="skeleton-card">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div class="skeleton skeleton-avatar"></div>
                        <div style="flex: 1;">
                            <div class="skeleton skeleton-text short"></div>
                            <div class="skeleton skeleton-text medium"></div>
                        </div>
                    </div>
                    <div class="skeleton skeleton-text long"></div>
                    <div class="skeleton skeleton-text medium"></div>
                    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                        <div class="skeleton skeleton-button"></div>
                        <div class="skeleton skeleton-button"></div>
                    </div>
                </div>
            </div>
        `);

        // Clients skeleton
        this.skeletonTemplates.set('clients', `
            <div class="skeleton-grid">
                <div class="skeleton-card">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div class="skeleton skeleton-avatar"></div>
                        <div style="flex: 1;">
                            <div class="skeleton skeleton-text short"></div>
                            <div class="skeleton skeleton-text medium"></div>
                        </div>
                    </div>
                    <div class="skeleton skeleton-text long"></div>
                    <div class="skeleton skeleton-text medium"></div>
                </div>
            </div>
        `);

        // Projects skeleton
        this.skeletonTemplates.set('projects', `
            <div class="skeleton-grid">
                <div class="skeleton-card">
                    <div class="skeleton skeleton-text short"></div>
                    <div class="skeleton skeleton-text medium"></div>
                    <div class="skeleton skeleton-text long"></div>
                    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                        <div class="skeleton skeleton-button"></div>
                        <div class="skeleton skeleton-button"></div>
                    </div>
                </div>
            </div>
        `);

        // Charts skeleton
        this.skeletonTemplates.set('charts', `
            <div class="skeleton-grid skeleton-grid-2">
                <div class="skeleton-card">
                    <div class="skeleton skeleton-text short"></div>
                    <div class="skeleton skeleton-chart"></div>
                </div>
                <div class="skeleton-card">
                    <div class="skeleton skeleton-text short"></div>
                    <div class="skeleton skeleton-chart"></div>
                </div>
            </div>
        `);
    }

    // Show global loading overlay
    showGlobalLoading(text = 'Cargando...', subtext = 'Por favor espera') {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.id = 'global-loading';
        
        const isDark = document.body.classList.contains('theme-dark');
        if (isDark) {
            overlay.classList.add('dark');
        }
        
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner-large"></div>
                <div class="loading-text">${text}</div>
                <div class="loading-subtext">${subtext}</div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Show with animation
        setTimeout(() => {
            overlay.classList.add('show');
        }, 10);
        
        return overlay;
    }

    // Hide global loading overlay
    hideGlobalLoading() {
        const overlay = document.getElementById('global-loading');
        if (overlay) {
            overlay.classList.remove('show');
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
    }

    // Show skeleton for specific component
    showSkeleton(container, type) {
        const template = this.skeletonTemplates.get(type);
        if (!template) return;

        const skeletonElement = document.createElement('div');
        skeletonElement.className = 'skeleton-container';
        skeletonElement.innerHTML = template;
        
        container.appendChild(skeletonElement);
        return skeletonElement;
    }

    // Hide skeleton
    hideSkeleton(container) {
        const skeleton = container.querySelector('.skeleton-container');
        if (skeleton) {
            skeleton.remove();
        }
    }

    // Show loading state for button
    showButtonLoading(button, text = 'Cargando...') {
        const originalText = button.textContent;
        button.dataset.originalText = originalText;
        button.textContent = text;
        button.classList.add('btn-loading');
        button.disabled = true;
        
        return () => {
            button.textContent = originalText;
            button.classList.remove('btn-loading');
            button.disabled = false;
        };
    }

    // Show loading state for form
    showFormLoading(form) {
        form.classList.add('form-loading');
        const inputs = form.querySelectorAll('input, button, select, textarea');
        inputs.forEach(input => input.disabled = true);
        
        return () => {
            form.classList.remove('form-loading');
            inputs.forEach(input => input.disabled = false);
        };
    }

    // Show loading state for table
    showTableLoading(table) {
        table.classList.add('table-loading');
        
        return () => {
            table.classList.remove('table-loading');
        };
    }

    // Show inline loading
    showInlineLoading(container, text = 'Cargando...') {
        const loadingElement = document.createElement('div');
        loadingElement.className = 'inline-loading';
        loadingElement.innerHTML = `
            <div class="spinner"></div>
            <span>${text}</span>
        `;
        
        container.appendChild(loadingElement);
        return loadingElement;
    }

    // Hide inline loading
    hideInlineLoading(container) {
        const loading = container.querySelector('.inline-loading');
        if (loading) {
            loading.remove();
        }
    }

    // Show progress indicator
    showProgress(container, text = 'Procesando...') {
        const progressElement = document.createElement('div');
        progressElement.className = 'progress-indicator';
        progressElement.innerHTML = `
            <div style="margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--text-secondary);">
                ${text}
            </div>
        `;
        
        container.appendChild(progressElement);
        return progressElement;
    }

    // Simulate loading with skeleton
    async simulateLoading(container, type, duration = 2000) {
        this.showSkeleton(container, type);
        
        await new Promise(resolve => setTimeout(resolve, duration));
        
        this.hideSkeleton(container);
    }

    // Loading state for API calls
    async withLoading(apiCall, options = {}) {
        const {
            container = null,
            skeletonType = null,
            button = null,
            form = null,
            table = null,
            global = false,
            text = 'Cargando...',
            subtext = 'Por favor espera'
        } = options;

        let hideLoading = null;

        try {
            // Show appropriate loading state
            if (global) {
                this.showGlobalLoading(text, subtext);
            } else if (skeletonType && container) {
                this.showSkeleton(container, skeletonType);
            } else if (button) {
                hideLoading = this.showButtonLoading(button, text);
            } else if (form) {
                hideLoading = this.showFormLoading(form);
            } else if (table) {
                hideLoading = this.showTableLoading(table);
            }

            // Make API call
            const result = await apiCall();
            
            return result;
        } catch (error) {
            throw error;
        } finally {
            // Hide loading state
            if (global) {
                this.hideGlobalLoading();
            } else if (skeletonType && container) {
                this.hideSkeleton(container);
            } else if (hideLoading) {
                hideLoading();
            }
        }
    }

    // Public methods
    getSkeletonTemplate(type) {
        return this.skeletonTemplates.get(type);
    }

    addSkeletonTemplate(type, template) {
        this.skeletonTemplates.set(type, template);
    }
}

// Global loading manager instance
window.loadingManager = new LoadingManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoadingManager;
}
