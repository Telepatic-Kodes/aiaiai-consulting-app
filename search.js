/**
 * AIAIAI Consulting - Global Search System
 * Sistema de búsqueda global inteligente
 */

class GlobalSearchManager {
    constructor() {
        this.searchData = [];
        this.searchIndex = new Map();
        this.searchResults = [];
        this.isOpen = false;
        this.currentQuery = '';
        this.selectedIndex = -1;
        this.init();
    }

    init() {
        this.createSearchUI();
        this.loadSearchData();
        this.buildSearchIndex();
        this.addEventListeners();
    }

    createSearchUI() {
        // Create search overlay
        const searchOverlay = document.createElement('div');
        searchOverlay.className = 'search-overlay';
        searchOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 10000;
            display: none;
            align-items: flex-start;
            justify-content: center;
            padding-top: 10vh;
        `;

        // Create search container
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.style.cssText = `
            background: var(--surface);
            border-radius: 12px;
            box-shadow: 0 20px 60px var(--shadow);
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow: hidden;
            transform: scale(0.9);
            transition: all 0.3s ease;
        `;

        // Create search input
        const searchInput = document.createElement('input');
        searchInput.className = 'search-input';
        searchInput.type = 'text';
        searchInput.placeholder = 'Buscar clientes, proyectos, agentes...';
        searchInput.style.cssText = `
            width: 100%;
            padding: 1.5rem;
            border: none;
            background: transparent;
            font-size: 1.25rem;
            color: var(--text-primary);
            outline: none;
        `;

        // Create results container
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        resultsContainer.style.cssText = `
            max-height: 400px;
            overflow-y: auto;
            border-top: 1px solid var(--border);
        `;

        // Create shortcuts info
        const shortcutsInfo = document.createElement('div');
        shortcutsInfo.className = 'search-shortcuts';
        shortcutsInfo.style.cssText = `
            padding: 1rem;
            background: var(--background);
            border-top: 1px solid var(--border);
            font-size: 0.75rem;
            color: var(--text-secondary);
            display: flex;
            gap: 1rem;
        `;
        shortcutsInfo.innerHTML = `
            <span>↑↓ Navegar</span>
            <span>Enter Seleccionar</span>
            <span>Esc Cerrar</span>
        `;

        // Assemble UI
        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(resultsContainer);
        searchContainer.appendChild(shortcutsInfo);
        searchOverlay.appendChild(searchContainer);
        document.body.appendChild(searchOverlay);

        // Store references
        this.searchOverlay = searchOverlay;
        this.searchContainer = searchContainer;
        this.searchInput = searchInput;
        this.resultsContainer = resultsContainer;
    }

    loadSearchData() {
        // Load data from localStorage or API
        this.searchData = [
            // Clients
            { type: 'client', id: 1, title: 'María González', subtitle: 'TechCorp Chile', url: 'clients.html', tags: ['CTO', 'technology', 'active'] },
            { type: 'client', id: 2, title: 'Carlos Rodríguez', subtitle: 'Innovate Solutions', url: 'clients.html', tags: ['CEO', 'technology', 'active'] },
            { type: 'client', id: 3, title: 'Ana Silva', subtitle: 'RetailMax', url: 'clients.html', tags: ['Gerente General', 'retail', 'active'] },
            { type: 'client', id: 4, title: 'Roberto Martínez', subtitle: 'StartupLatam', url: 'clients.html', tags: ['Fundador', 'technology', 'prospect'] },
            { type: 'client', id: 5, title: 'Laura Fernández', subtitle: 'FinancePro', url: 'clients.html', tags: ['Directora de Operaciones', 'finance', 'active'] },
            { type: 'client', id: 6, title: 'Diego Herrera', subtitle: 'HealthTech', url: 'clients.html', tags: ['Director de TI', 'healthcare', 'prospect'] },

            // Projects
            { type: 'project', id: 1, title: 'Implementación Lead Scorer', subtitle: 'TechCorp Chile', url: 'projects.html', tags: ['active', 'high', 'lead-scorer'] },
            { type: 'project', id: 2, title: 'Automatización de Propuestas', subtitle: 'Innovate Solutions', url: 'projects.html', tags: ['active', 'medium', 'proposal-builder'] },
            { type: 'project', id: 3, title: 'Optimización de Reuniones', subtitle: 'RetailMax', url: 'projects.html', tags: ['completed', 'high', 'meeting-summarizer'] },
            { type: 'project', id: 4, title: 'Automatización de CRM', subtitle: 'FinancePro', url: 'projects.html', tags: ['planning', 'medium', 'crm-updater'] },
            { type: 'project', id: 5, title: 'Sistema de Facturación', subtitle: 'HealthTech', url: 'projects.html', tags: ['on-hold', 'low', 'invoice-generator'] },

            // Agents
            { type: 'agent', id: 'lead-scorer', title: 'Lead Scorer', subtitle: 'Calificación automática de leads', url: 'agents.html', tags: ['active', '85%', '1247 leads'] },
            { type: 'agent', id: 'proposal-builder', title: 'Proposal Builder', subtitle: 'Generación de propuestas', url: 'agents.html', tags: ['active', '95%', '89 propuestas'] },
            { type: 'agent', id: 'meeting-summarizer', title: 'Meeting Summarizer', subtitle: 'Resúmenes de reuniones', url: 'agents.html', tags: ['active', '88%', '156 reuniones'] },
            { type: 'agent', id: 'crm-updater', title: 'CRM Updater', subtitle: 'Sincronización de CRM', url: 'agents.html', tags: ['beta', '92%', '2341 registros'] },
            { type: 'agent', id: 'followup-scheduler', title: 'Follow-up Scheduler', subtitle: 'Programación de seguimientos', url: 'agents.html', tags: ['development', '0%', '0 seguimientos'] },
            { type: 'agent', id: 'invoice-generator', title: 'Invoice Generator', subtitle: 'Generación de facturas', url: 'agents.html', tags: ['development', '0%', '0 facturas'] },

            // Pages
            { type: 'page', id: 'dashboard', title: 'Dashboard', subtitle: 'Panel principal con métricas', url: 'index.html', tags: ['dashboard', 'métricas', 'KPIs'] },
            { type: 'page', id: 'reports', title: 'Reportes', subtitle: 'Analytics y reportes', url: 'reports.html', tags: ['reportes', 'analytics', 'gráficos'] },
            { type: 'page', id: 'settings', title: 'Configuraciones', subtitle: 'Ajustes del sistema', url: '#', tags: ['configuración', 'ajustes', 'preferencias'] }
        ];
    }

    buildSearchIndex() {
        this.searchIndex.clear();
        
        this.searchData.forEach((item, index) => {
            const searchableText = [
                item.title,
                item.subtitle,
                ...item.tags
            ].join(' ').toLowerCase();

            // Split into words and create index
            const words = searchableText.split(/\s+/);
            words.forEach(word => {
                if (word.length > 2) { // Only index words longer than 2 characters
                    if (!this.searchIndex.has(word)) {
                        this.searchIndex.set(word, []);
                    }
                    this.searchIndex.get(word).push(index);
                }
            });
        });
    }

    addEventListeners() {
        // Global keyboard shortcut (Ctrl/Cmd + K)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
            }
        });

        // Search input events
        this.searchInput.addEventListener('input', (e) => {
            this.currentQuery = e.target.value;
            this.performSearch();
        });

        this.searchInput.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'Escape':
                    this.closeSearch();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.navigateResults(1);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.navigateResults(-1);
                    break;
                case 'Enter':
                    e.preventDefault();
                    this.selectResult();
                    break;
            }
        });

        // Close on overlay click
        this.searchOverlay.addEventListener('click', (e) => {
            if (e.target === this.searchOverlay) {
                this.closeSearch();
            }
        });
    }

    openSearch() {
        this.isOpen = true;
        this.searchOverlay.style.display = 'flex';
        this.searchContainer.style.transform = 'scale(1)';
        this.searchInput.focus();
        this.searchInput.value = '';
        this.currentQuery = '';
        this.selectedIndex = -1;
        this.renderResults([]);
    }

    closeSearch() {
        this.isOpen = false;
        this.searchOverlay.style.display = 'none';
        this.searchContainer.style.transform = 'scale(0.9)';
        this.searchInput.value = '';
        this.currentQuery = '';
        this.selectedIndex = -1;
    }

    performSearch() {
        if (!this.currentQuery.trim()) {
            this.renderResults([]);
            return;
        }

        const query = this.currentQuery.toLowerCase();
        const results = new Set();

        // Search in index
        const words = query.split(/\s+/);
        words.forEach(word => {
            if (word.length > 2) {
                const matches = this.searchIndex.get(word) || [];
                matches.forEach(index => results.add(index));
            }
        });

        // Score and sort results
        const scoredResults = Array.from(results).map(index => {
            const item = this.searchData[index];
            const score = this.calculateScore(item, query);
            return { ...item, score, originalIndex: index };
        }).sort((a, b) => b.score - a.score);

        this.searchResults = scoredResults;
        this.selectedIndex = -1;
        this.renderResults(scoredResults);
    }

    calculateScore(item, query) {
        let score = 0;
        const queryLower = query.toLowerCase();
        const titleLower = item.title.toLowerCase();
        const subtitleLower = item.subtitle.toLowerCase();

        // Exact title match
        if (titleLower === queryLower) score += 100;
        else if (titleLower.startsWith(queryLower)) score += 50;
        else if (titleLower.includes(queryLower)) score += 25;

        // Subtitle match
        if (subtitleLower.includes(queryLower)) score += 15;

        // Tag matches
        item.tags.forEach(tag => {
            if (tag.toLowerCase().includes(queryLower)) score += 10;
        });

        // Type bonus
        const typeBonus = { client: 5, project: 4, agent: 3, page: 2 };
        score += typeBonus[item.type] || 0;

        return score;
    }

    renderResults(results) {
        this.resultsContainer.innerHTML = '';

        if (results.length === 0 && this.currentQuery.trim()) {
            this.resultsContainer.innerHTML = `
                <div style="padding: 2rem; text-align: center; color: var(--text-secondary);">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">🔍</div>
                    <div>No se encontraron resultados para "${this.currentQuery}"</div>
                </div>
            `;
            return;
        }

        if (results.length === 0) {
            this.resultsContainer.innerHTML = `
                <div style="padding: 2rem; text-align: center; color: var(--text-secondary);">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">⚡</div>
                    <div>Busca clientes, proyectos, agentes o páginas</div>
                    <div style="font-size: 0.875rem; margin-top: 0.5rem;">Usa Ctrl+K para abrir rápidamente</div>
                </div>
            `;
            return;
        }

        results.forEach((result, index) => {
            const resultElement = this.createResultElement(result, index);
            this.resultsContainer.appendChild(resultElement);
        });
    }

    createResultElement(result, index) {
        const element = document.createElement('div');
        element.className = 'search-result';
        element.style.cssText = `
            padding: 1rem;
            border-bottom: 1px solid var(--border);
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 1rem;
        `;

        if (index === this.selectedIndex) {
            element.style.backgroundColor = 'var(--primary)';
            element.style.color = 'white';
        }

        const icon = this.getTypeIcon(result.type);
        const typeLabel = this.getTypeLabel(result.type);

        element.innerHTML = `
            <div style="
                width: 40px;
                height: 40px;
                border-radius: 8px;
                background: var(--primary);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.25rem;
                flex-shrink: 0;
            ">${icon}</div>
            
            <div style="flex: 1; min-width: 0;">
                <div style="
                    font-weight: 600;
                    margin-bottom: 0.25rem;
                    font-size: 0.875rem;
                ">${result.title}</div>
                
                <div style="
                    color: var(--text-secondary);
                    font-size: 0.75rem;
                    margin-bottom: 0.25rem;
                ">${result.subtitle}</div>
                
                <div style="
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                ">
                    <span style="
                        background: var(--background);
                        color: var(--text-secondary);
                        padding: 0.125rem 0.5rem;
                        border-radius: 12px;
                        font-size: 0.625rem;
                        font-weight: 500;
                    ">${typeLabel}</span>
                    ${result.tags.slice(0, 2).map(tag => `
                        <span style="
                            background: var(--background);
                            color: var(--text-secondary);
                            padding: 0.125rem 0.5rem;
                            border-radius: 12px;
                            font-size: 0.625rem;
                        ">${tag}</span>
                    `).join('')}
                </div>
            </div>
        `;

        element.addEventListener('click', () => {
            this.selectResult(index);
        });

        element.addEventListener('mouseenter', () => {
            if (index !== this.selectedIndex) {
                element.style.backgroundColor = 'var(--background)';
            }
        });

        element.addEventListener('mouseleave', () => {
            if (index !== this.selectedIndex) {
                element.style.backgroundColor = 'transparent';
            }
        });

        return element;
    }

    navigateResults(direction) {
        if (this.searchResults.length === 0) return;

        this.selectedIndex += direction;
        
        if (this.selectedIndex < 0) {
            this.selectedIndex = this.searchResults.length - 1;
        } else if (this.selectedIndex >= this.searchResults.length) {
            this.selectedIndex = 0;
        }

        this.renderResults(this.searchResults);
    }

    selectResult(index = null) {
        const targetIndex = index !== null ? index : this.selectedIndex;
        
        if (targetIndex >= 0 && targetIndex < this.searchResults.length) {
            const result = this.searchResults[targetIndex];
            this.closeSearch();
            
            // Navigate to result
            if (result.url && result.url !== '#') {
                window.location.href = result.url;
            }
        }
    }

    getTypeIcon(type) {
        const icons = {
            client: '👤',
            project: '📊',
            agent: '🤖',
            page: '📄'
        };
        return icons[type] || '📄';
    }

    getTypeLabel(type) {
        const labels = {
            client: 'Cliente',
            project: 'Proyecto',
            agent: 'Agente',
            page: 'Página'
        };
        return labels[type] || 'Elemento';
    }
}

// Global search manager instance
window.globalSearchManager = new GlobalSearchManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GlobalSearchManager;
}
