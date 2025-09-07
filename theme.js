/**
 * AIAIAI Consulting - Theme Manager
 * Sistema de gestión de temas (modo oscuro/claro)
 */

class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.themes = {
            light: {
                name: 'Claro',
                icon: '☀️',
                colors: {
                    '--primary': '#3A86FF',
                    '--accent': '#FFD700',
                    '--dark': '#1f2937',
                    '--light': '#f8f9fa',
                    '--gray': '#6b7280',
                    '--success': '#10b981',
                    '--warning': '#f59e0b',
                    '--error': '#ef4444',
                    '--background': '#ffffff',
                    '--surface': '#ffffff',
                    '--text-primary': '#1f2937',
                    '--text-secondary': '#6b7280',
                    '--border': '#e5e7eb',
                    '--shadow': 'rgba(0,0,0,0.1)'
                }
            },
            dark: {
                name: 'Oscuro',
                icon: '🌙',
                colors: {
                    '--primary': '#60a5fa',
                    '--accent': '#fbbf24',
                    '--dark': '#f9fafb',
                    '--light': '#1f2937',
                    '--gray': '#9ca3af',
                    '--success': '#34d399',
                    '--warning': '#fbbf24',
                    '--error': '#f87171',
                    '--background': '#111827',
                    '--surface': '#1f2937',
                    '--text-primary': '#f9fafb',
                    '--text-secondary': '#d1d5db',
                    '--border': '#374151',
                    '--shadow': 'rgba(0,0,0,0.3)'
                }
            }
        };
        this.init();
    }

    init() {
        // Load saved theme
        this.loadTheme();
        
        // Apply theme
        this.applyTheme(this.currentTheme);
        
        // Add theme toggle to header
        this.addThemeToggle();
        
        // Listen for system theme changes
        this.listenForSystemTheme();
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme && this.themes[savedTheme]) {
            this.currentTheme = savedTheme;
        } else if (systemPrefersDark) {
            this.currentTheme = 'dark';
        } else {
            this.currentTheme = 'light';
        }
    }

    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;

        const root = document.documentElement;
        
        // Apply CSS custom properties
        Object.entries(theme.colors).forEach(([property, value]) => {
            root.style.setProperty(property, value);
        });

        // Update body class
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${themeName}`);

        // Update theme toggle button
        this.updateThemeToggle();

        // Save theme preference
        localStorage.setItem('theme', themeName);
        this.currentTheme = themeName;

        // Dispatch theme change event
        document.dispatchEvent(new CustomEvent('theme-changed', {
            detail: { theme: themeName, themeData: theme }
        }));
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        
        // Show notification
        if (window.notificationManager) {
            window.notificationManager.info('Tema Cambiado', 
                `Cambiado a modo ${this.themes[newTheme].name.toLowerCase()}`);
        }
    }

    addThemeToggle() {
        // Check if theme toggle already exists
        if (document.querySelector('.theme-toggle')) return;

        const header = document.querySelector('.header .nav');
        if (!header) return;

        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.style.cssText = `
            background: none;
            border: 2px solid var(--border);
            border-radius: 8px;
            padding: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            color: var(--text-primary);
        `;

        themeToggle.addEventListener('click', () => this.toggleTheme());
        themeToggle.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--primary)';
            this.style.backgroundColor = 'var(--primary)';
            this.style.color = 'white';
        });
        themeToggle.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--border)';
            this.style.backgroundColor = 'transparent';
            this.style.color = 'var(--text-primary)';
        });

        // Insert before user menu or at the end
        const userMenu = header.querySelector('.user-menu');
        if (userMenu) {
            header.insertBefore(themeToggle, userMenu);
        } else {
            header.appendChild(themeToggle);
        }

        this.updateThemeToggle();
    }

    updateThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        const currentThemeData = this.themes[this.currentTheme];
        themeToggle.innerHTML = currentThemeData.icon;
        themeToggle.title = `Cambiar a modo ${this.currentTheme === 'light' ? 'oscuro' : 'claro'}`;
    }

    listenForSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            const savedTheme = localStorage.getItem('theme');
            if (!savedTheme) {
                const newTheme = e.matches ? 'dark' : 'light';
                this.applyTheme(newTheme);
            }
        });
    }

    // Public methods
    getCurrentTheme() {
        return this.currentTheme;
    }

    getThemeData(themeName = null) {
        return this.themes[themeName || this.currentTheme];
    }

    setTheme(themeName) {
        if (this.themes[themeName]) {
            this.applyTheme(themeName);
        }
    }

    // Get theme-aware color
    getColor(colorName) {
        const theme = this.getThemeData();
        return theme.colors[`--${colorName}`] || theme.colors[colorName];
    }
}

// Global theme manager instance
window.themeManager = new ThemeManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}
