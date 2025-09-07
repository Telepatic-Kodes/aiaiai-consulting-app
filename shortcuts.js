/**
 * AIAIAI Consulting - Keyboard Shortcuts System
 * Sistema de atajos de teclado
 */

class KeyboardShortcutsManager {
    constructor() {
        this.shortcuts = new Map();
        this.isEnabled = true;
        this.showHelp = false;
        this.init();
    }

    init() {
        this.registerDefaultShortcuts();
        this.addEventListeners();
        this.createHelpOverlay();
    }

    registerDefaultShortcuts() {
        // Navigation shortcuts
        this.register('ctrl+1', () => this.navigateTo('index.html'), 'Ir al Dashboard');
        this.register('ctrl+2', () => this.navigateTo('agents.html'), 'Ir a Agentes');
        this.register('ctrl+3', () => this.navigateTo('clients.html'), 'Ir a Clientes');
        this.register('ctrl+4', () => this.navigateTo('projects.html'), 'Ir a Proyectos');
        this.register('ctrl+5', () => this.navigateTo('reports.html'), 'Ir a Reportes');

        // Global shortcuts
        this.register('ctrl+k', () => this.openGlobalSearch(), 'Búsqueda Global');
        this.register('ctrl+/', () => this.toggleHelp(), 'Mostrar/Ocultar Ayuda');
        this.register('ctrl+shift+d', () => this.toggleTheme(), 'Cambiar Tema');
        this.register('ctrl+shift+n', () => this.showNotifications(), 'Mostrar Notificaciones');

        // Action shortcuts
        this.register('ctrl+n', () => this.createNew(), 'Crear Nuevo');
        this.register('ctrl+s', () => this.save(), 'Guardar');
        this.register('ctrl+e', () => this.export(), 'Exportar');
        this.register('ctrl+f', () => this.focusSearch(), 'Buscar');

        // Modal shortcuts
        this.register('escape', () => this.closeModals(), 'Cerrar Modales');

        // Page-specific shortcuts
        this.registerPageShortcuts();
    }

    registerPageShortcuts() {
        const currentPage = this.getCurrentPage();
        
        switch (currentPage) {
            case 'agents':
                this.register('ctrl+shift+a', () => this.openAgentModal(), 'Nuevo Agente');
                this.register('ctrl+shift+t', () => this.testAgent(), 'Probar Agente');
                break;
            case 'clients':
                this.register('ctrl+shift+c', () => this.openClientModal(), 'Nuevo Cliente');
                this.register('ctrl+shift+o', () => this.exportClients(), 'Exportar Clientes');
                break;
            case 'projects':
                this.register('ctrl+shift+p', () => this.openProjectModal(), 'Nuevo Proyecto');
                this.register('ctrl+shift+v', () => this.switchView(), 'Cambiar Vista');
                break;
            case 'reports':
                this.register('ctrl+shift+r', () => this.generateReport(), 'Generar Reporte');
                this.register('ctrl+shift+x', () => this.exportReport(), 'Exportar Reporte');
                break;
        }
    }

    register(keyCombo, callback, description) {
        this.shortcuts.set(keyCombo, { callback, description });
    }

    addEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (!this.isEnabled) return;

            // Don't trigger shortcuts when typing in inputs
            if (this.isTypingInInput(e.target)) return;

            const keyCombo = this.getKeyCombo(e);
            const shortcut = this.shortcuts.get(keyCombo);

            if (shortcut) {
                e.preventDefault();
                shortcut.callback();
                
                // Show visual feedback
                this.showShortcutFeedback(keyCombo);
            }
        });
    }

    getKeyCombo(event) {
        const parts = [];
        
        if (event.ctrlKey) parts.push('ctrl');
        if (event.shiftKey) parts.push('shift');
        if (event.altKey) parts.push('alt');
        if (event.metaKey) parts.push('meta');
        
        parts.push(event.key.toLowerCase());
        
        return parts.join('+');
    }

    isTypingInInput(element) {
        const inputTypes = ['input', 'textarea', 'select'];
        return inputTypes.includes(element.tagName.toLowerCase()) || 
               element.contentEditable === 'true';
    }

    // Navigation methods
    navigateTo(url) {
        window.location.href = url;
    }

    openGlobalSearch() {
        if (window.globalSearchManager) {
            window.globalSearchManager.openSearch();
        }
    }

    toggleHelp() {
        this.showHelp = !this.showHelp;
        const helpOverlay = document.querySelector('.shortcuts-help-overlay');
        if (helpOverlay) {
            helpOverlay.style.display = this.showHelp ? 'flex' : 'none';
        }
    }

    toggleTheme() {
        if (window.themeManager) {
            window.themeManager.toggleTheme();
        }
    }

    showNotifications() {
        if (window.notificationManager) {
            window.notificationManager.info('Atajos de Teclado', 
                'Usa Ctrl+/ para ver todos los atajos disponibles');
        }
    }

    // Action methods
    createNew() {
        const currentPage = this.getCurrentPage();
        switch (currentPage) {
            case 'agents':
                this.openAgentModal();
                break;
            case 'clients':
                this.openClientModal();
                break;
            case 'projects':
                this.openProjectModal();
                break;
        }
    }

    save() {
        // Find and trigger save buttons
        const saveButtons = document.querySelectorAll('button[type="submit"], .btn-primary');
        saveButtons.forEach(button => {
            if (button.textContent.toLowerCase().includes('guardar') || 
                button.textContent.toLowerCase().includes('save')) {
                button.click();
            }
        });
    }

    export() {
        const currentPage = this.getCurrentPage();
        switch (currentPage) {
            case 'clients':
                this.exportClients();
                break;
            case 'projects':
                this.exportProjects();
                break;
            case 'reports':
                this.exportReport();
                break;
        }
    }

    focusSearch() {
        const searchInputs = document.querySelectorAll('input[type="text"], input[placeholder*="buscar"], input[placeholder*="search"]');
        if (searchInputs.length > 0) {
            searchInputs[0].focus();
        }
    }

    closeModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }

    // Page-specific methods
    openAgentModal() {
        if (typeof openAgentModal === 'function') {
            openAgentModal();
        }
    }

    testAgent() {
        if (typeof testAgent === 'function') {
            testAgent('lead-scorer');
        }
    }

    openClientModal() {
        if (typeof openClientModal === 'function') {
            openClientModal();
        }
    }

    exportClients() {
        if (typeof exportClients === 'function') {
            exportClients();
        }
    }

    openProjectModal() {
        if (typeof openProjectModal === 'function') {
            openProjectModal();
        }
    }

    switchView() {
        if (typeof switchView === 'function') {
            switchView('timeline');
        }
    }

    generateReport() {
        if (typeof generateReport === 'function') {
            generateReport();
        }
    }

    exportReport() {
        if (typeof exportToPDF === 'function') {
            exportToPDF();
        }
    }

    exportProjects() {
        if (typeof exportProjects === 'function') {
            exportProjects();
        }
    }

    // Utility methods
    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('agents.html')) return 'agents';
        if (path.includes('clients.html')) return 'clients';
        if (path.includes('projects.html')) return 'projects';
        if (path.includes('reports.html')) return 'reports';
        return 'dashboard';
    }

    showShortcutFeedback(keyCombo) {
        // Create temporary feedback element
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 0.875rem;
            font-weight: 500;
            z-index: 10001;
            animation: fadeInOut 2s ease-in-out;
        `;
        feedback.textContent = keyCombo;

        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }

    createHelpOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'shortcuts-help-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        `;

        const container = document.createElement('div');
        container.style.cssText = `
            background: var(--surface);
            border-radius: 12px;
            padding: 2rem;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px var(--shadow);
        `;

        const header = document.createElement('div');
        header.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        `;
        header.innerHTML = `
            <h2 style="margin: 0; color: var(--text-primary);">Atajos de Teclado</h2>
            <button onclick="window.keyboardShortcutsManager.toggleHelp()" style="
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--text-secondary);
            ">&times;</button>
        `;

        const shortcutsList = document.createElement('div');
        shortcutsList.style.cssText = `
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        `;

        // Group shortcuts by category
        const categories = {
            'Navegación': [],
            'Acciones': [],
            'Globales': [],
            'Página Actual': []
        };

        this.shortcuts.forEach((shortcut, keyCombo) => {
            if (keyCombo.startsWith('ctrl+1') || keyCombo.startsWith('ctrl+2') || 
                keyCombo.startsWith('ctrl+3') || keyCombo.startsWith('ctrl+4') || 
                keyCombo.startsWith('ctrl+5')) {
                categories['Navegación'].push({ keyCombo, ...shortcut });
            } else if (keyCombo.includes('ctrl+k') || keyCombo.includes('ctrl+/') || 
                       keyCombo.includes('ctrl+shift+d') || keyCombo.includes('ctrl+shift+n')) {
                categories['Globales'].push({ keyCombo, ...shortcut });
            } else if (keyCombo.includes('ctrl+n') || keyCombo.includes('ctrl+s') || 
                       keyCombo.includes('ctrl+e') || keyCombo.includes('ctrl+f')) {
                categories['Acciones'].push({ keyCombo, ...shortcut });
            } else {
                categories['Página Actual'].push({ keyCombo, ...shortcut });
            }
        });

        Object.entries(categories).forEach(([category, shortcuts]) => {
            if (shortcuts.length === 0) return;

            const categoryDiv = document.createElement('div');
            categoryDiv.style.cssText = `
                grid-column: 1 / -1;
                margin-bottom: 1rem;
            `;

            const categoryTitle = document.createElement('h3');
            categoryTitle.style.cssText = `
                margin: 0 0 1rem 0;
                color: var(--text-primary);
                font-size: 1rem;
                font-weight: 600;
            `;
            categoryTitle.textContent = category;

            const shortcutsGrid = document.createElement('div');
            shortcutsGrid.style.cssText = `
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.5rem;
            `;

            shortcuts.forEach(shortcut => {
                const shortcutDiv = document.createElement('div');
                shortcutDiv.style.cssText = `
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.5rem;
                    background: var(--background);
                    border-radius: 6px;
                `;

                const keyDiv = document.createElement('div');
                keyDiv.style.cssText = `
                    background: var(--primary);
                    color: white;
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    font-weight: 500;
                `;
                keyDiv.textContent = shortcut.keyCombo;

                const descDiv = document.createElement('div');
                descDiv.style.cssText = `
                    color: var(--text-secondary);
                    font-size: 0.875rem;
                `;
                descDiv.textContent = shortcut.description;

                shortcutDiv.appendChild(descDiv);
                shortcutDiv.appendChild(keyDiv);
                shortcutsGrid.appendChild(shortcutDiv);
            });

            categoryDiv.appendChild(categoryTitle);
            categoryDiv.appendChild(shortcutsGrid);
            shortcutsList.appendChild(categoryDiv);
        });

        container.appendChild(header);
        container.appendChild(shortcutsList);
        overlay.appendChild(container);
        document.body.appendChild(overlay);
    }

    // Public methods
    enable() {
        this.isEnabled = true;
    }

    disable() {
        this.isEnabled = false;
    }

    getShortcuts() {
        return Array.from(this.shortcuts.entries()).map(([key, value]) => ({
            keyCombo: key,
            ...value
        }));
    }
}

// Global keyboard shortcuts manager instance
window.keyboardShortcutsManager = new KeyboardShortcutsManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KeyboardShortcutsManager;
}
