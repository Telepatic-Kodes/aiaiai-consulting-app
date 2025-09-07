/**
 * AIAIAI Consulting - Responsive Design System
 * Sistema de diseño responsive y mobile-first avanzado
 */

class ResponsiveManager {
    constructor() {
        this.breakpoints = {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
            xxl: 1400
        };
        this.currentBreakpoint = 'lg';
        this.isMobile = false;
        this.isTablet = false;
        this.isDesktop = false;
        this.init();
    }

    init() {
        this.addResponsiveStyles();
        this.setupBreakpointDetection();
        this.setupTouchSupport();
        this.setupViewportHandling();
        this.optimizeForDevice();
    }

    addResponsiveStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Mobile First Base Styles */
            .container {
                width: 100%;
                padding: 0 1rem;
                margin: 0 auto;
            }

            /* Responsive Grid System */
            .grid {
                display: grid;
                gap: 1rem;
            }

            .grid-1 { grid-template-columns: 1fr; }
            .grid-2 { grid-template-columns: 1fr; }
            .grid-3 { grid-template-columns: 1fr; }
            .grid-4 { grid-template-columns: 1fr; }

            /* Responsive Cards */
            .card {
                width: 100%;
                margin-bottom: 1rem;
            }

            /* Responsive Navigation */
            .nav {
                flex-direction: column;
                gap: 0.5rem;
            }

            .nav-item {
                width: 100%;
                text-align: center;
                padding: 0.75rem;
            }

            /* Responsive Header */
            .header {
                flex-direction: column;
                gap: 1rem;
                padding: 1rem;
            }

            .header .nav {
                width: 100%;
                order: 2;
            }

            .header .user-menu {
                order: 1;
                align-self: flex-end;
            }

            /* Responsive Sidebar */
            .sidebar {
                position: fixed;
                top: 0;
                left: -100%;
                width: 280px;
                height: 100vh;
                background: var(--surface);
                border-right: 1px solid var(--border);
                transition: left 0.3s ease;
                z-index: 1000;
                overflow-y: auto;
            }

            .sidebar.open {
                left: 0;
            }

            .sidebar-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 999;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }

            .sidebar-overlay.show {
                opacity: 1;
                visibility: visible;
            }

            /* Mobile Menu Toggle */
            .mobile-menu-toggle {
                display: block;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--text-primary);
                cursor: pointer;
                padding: 0.5rem;
            }

            /* Responsive Tables */
            .table-responsive {
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
            }

            .table {
                min-width: 600px;
            }

            /* Responsive Forms */
            .form-group {
                margin-bottom: 1rem;
            }

            .form-control {
                width: 100%;
                padding: 0.75rem;
                font-size: 16px; /* Prevent zoom on iOS */
            }

            /* Responsive Buttons */
            .btn {
                width: 100%;
                padding: 0.75rem 1rem;
                font-size: 1rem;
                margin-bottom: 0.5rem;
            }

            .btn-group {
                flex-direction: column;
                gap: 0.5rem;
            }

            /* Responsive Modals */
            .modal {
                width: 95%;
                max-width: 500px;
                margin: 1rem auto;
                max-height: 90vh;
                overflow-y: auto;
            }

            .modal-content {
                padding: 1rem;
            }

            /* Responsive Charts */
            .chart-container {
                height: 250px;
                margin-bottom: 1rem;
            }

            /* Responsive Metrics */
            .metrics-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }

            .metric-card {
                padding: 1rem;
            }

            /* Responsive Agent Cards */
            .agent-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }

            .agent-card {
                padding: 1rem;
            }

            /* Responsive Client Cards */
            .client-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }

            .client-card {
                padding: 1rem;
            }

            /* Responsive Project Cards */
            .project-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }

            .project-card {
                padding: 1rem;
            }

            /* Touch-friendly Elements */
            .touch-target {
                min-height: 44px;
                min-width: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            /* Responsive Typography */
            h1 { font-size: 1.75rem; }
            h2 { font-size: 1.5rem; }
            h3 { font-size: 1.25rem; }
            h4 { font-size: 1.125rem; }
            h5 { font-size: 1rem; }
            h6 { font-size: 0.875rem; }

            /* Responsive Spacing */
            .p-1 { padding: 0.25rem; }
            .p-2 { padding: 0.5rem; }
            .p-3 { padding: 0.75rem; }
            .p-4 { padding: 1rem; }
            .p-5 { padding: 1.25rem; }

            .m-1 { margin: 0.25rem; }
            .m-2 { margin: 0.5rem; }
            .m-3 { margin: 0.75rem; }
            .m-4 { margin: 1rem; }
            .m-5 { margin: 1.25rem; }

            /* Responsive Utilities */
            .d-none { display: none; }
            .d-block { display: block; }
            .d-flex { display: flex; }
            .d-grid { display: grid; }

            .text-center { text-align: center; }
            .text-left { text-align: left; }
            .text-right { text-align: right; }

            .w-100 { width: 100%; }
            .h-100 { height: 100%; }

            /* Small devices (landscape phones, 576px and up) */
            @media (min-width: 576px) {
                .container {
                    max-width: 540px;
                }

                .grid-2 { grid-template-columns: 1fr 1fr; }
                .grid-3 { grid-template-columns: 1fr 1fr; }
                .grid-4 { grid-template-columns: 1fr 1fr; }

                .metrics-grid {
                    grid-template-columns: 1fr 1fr;
                }

                .btn {
                    width: auto;
                    margin-bottom: 0;
                }

                .btn-group {
                    flex-direction: row;
                }
            }

            /* Medium devices (tablets, 768px and up) */
            @media (min-width: 768px) {
                .container {
                    max-width: 720px;
                }

                .grid-3 { grid-template-columns: 1fr 1fr 1fr; }
                .grid-4 { grid-template-columns: 1fr 1fr 1fr 1fr; }

                .nav {
                    flex-direction: row;
                    gap: 1rem;
                }

                .nav-item {
                    width: auto;
                    text-align: left;
                    padding: 0.5rem 1rem;
                }

                .header {
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }

                .header .nav {
                    order: 1;
                    width: auto;
                }

                .header .user-menu {
                    order: 2;
                    align-self: auto;
                }

                .mobile-menu-toggle {
                    display: none;
                }

                .sidebar {
                    position: static;
                    width: 250px;
                    height: auto;
                    background: transparent;
                    border-right: none;
                    transition: none;
                }

                .metrics-grid {
                    grid-template-columns: repeat(4, 1fr);
                }

                .agent-grid {
                    grid-template-columns: 1fr 1fr;
                }

                .client-grid {
                    grid-template-columns: 1fr 1fr;
                }

                .project-grid {
                    grid-template-columns: 1fr 1fr;
                }

                .chart-container {
                    height: 300px;
                }

                .modal {
                    width: 80%;
                    max-width: 600px;
                }

                h1 { font-size: 2rem; }
                h2 { font-size: 1.75rem; }
                h3 { font-size: 1.5rem; }
            }

            /* Large devices (desktops, 992px and up) */
            @media (min-width: 992px) {
                .container {
                    max-width: 960px;
                }

                .agent-grid {
                    grid-template-columns: repeat(3, 1fr);
                }

                .client-grid {
                    grid-template-columns: repeat(3, 1fr);
                }

                .project-grid {
                    grid-template-columns: repeat(3, 1fr);
                }

                .chart-container {
                    height: 350px;
                }

                .modal {
                    width: 70%;
                    max-width: 800px;
                }
            }

            /* Extra large devices (large desktops, 1200px and up) */
            @media (min-width: 1200px) {
                .container {
                    max-width: 1140px;
                }

                .agent-grid {
                    grid-template-columns: repeat(4, 1fr);
                }

                .client-grid {
                    grid-template-columns: repeat(4, 1fr);
                }

                .project-grid {
                    grid-template-columns: repeat(4, 1fr);
                }

                .chart-container {
                    height: 400px;
                }
            }

            /* Extra extra large devices (1400px and up) */
            @media (min-width: 1400px) {
                .container {
                    max-width: 1320px;
                }
            }

            /* Landscape orientation adjustments */
            @media (orientation: landscape) and (max-height: 500px) {
                .header {
                    padding: 0.5rem 1rem;
                }

                .modal {
                    max-height: 95vh;
                }

                .chart-container {
                    height: 200px;
                }
            }

            /* High DPI displays */
            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                .card {
                    border-width: 0.5px;
                }
            }

            /* Print styles */
            @media print {
                .sidebar,
                .mobile-menu-toggle,
                .btn,
                .modal {
                    display: none !important;
                }

                .container {
                    max-width: none;
                    padding: 0;
                }

                .card {
                    break-inside: avoid;
                    box-shadow: none;
                    border: 1px solid #000;
                }
            }

            /* Dark mode responsive adjustments */
            @media (prefers-color-scheme: dark) {
                .sidebar-overlay {
                    background: rgba(0, 0, 0, 0.7);
                }
            }

            /* Reduced motion */
            @media (prefers-reduced-motion: reduce) {
                .sidebar,
                .modal,
                .card,
                .btn {
                    transition: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupBreakpointDetection() {
        const updateBreakpoint = () => {
            const width = window.innerWidth;
            
            if (width >= this.breakpoints.xxl) {
                this.currentBreakpoint = 'xxl';
            } else if (width >= this.breakpoints.xl) {
                this.currentBreakpoint = 'xl';
            } else if (width >= this.breakpoints.lg) {
                this.currentBreakpoint = 'lg';
            } else if (width >= this.breakpoints.md) {
                this.currentBreakpoint = 'md';
            } else if (width >= this.breakpoints.sm) {
                this.currentBreakpoint = 'sm';
            } else {
                this.currentBreakpoint = 'xs';
            }

            this.isMobile = width < this.breakpoints.md;
            this.isTablet = width >= this.breakpoints.md && width < this.breakpoints.lg;
            this.isDesktop = width >= this.breakpoints.lg;

            this.updateLayout();
            this.dispatchBreakpointChange();
        };

        window.addEventListener('resize', updateBreakpoint);
        updateBreakpoint();
    }

    setupTouchSupport() {
        // Add touch class to body
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            document.body.classList.add('touch-device');
        }

        // Handle touch events
        document.addEventListener('touchstart', (e) => {
            // Add touch feedback
            const target = e.target.closest('.btn, .card, .nav-item');
            if (target) {
                target.classList.add('touch-active');
            }
        });

        document.addEventListener('touchend', (e) => {
            // Remove touch feedback
            const target = e.target.closest('.btn, .card, .nav-item');
            if (target) {
                setTimeout(() => {
                    target.classList.remove('touch-active');
                }, 150);
            }
        });

        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    setupViewportHandling() {
        // Set viewport meta tag if not present
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            document.head.appendChild(viewport);
        }

        // Handle orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.updateLayout();
            }, 100);
        });
    }

    optimizeForDevice() {
        // Add device-specific optimizations
        if (this.isMobile) {
            this.optimizeForMobile();
        } else if (this.isTablet) {
            this.optimizeForTablet();
        } else {
            this.optimizeForDesktop();
        }
    }

    optimizeForMobile() {
        document.body.classList.add('mobile-layout');
        
        // Create mobile menu toggle
        this.createMobileMenuToggle();
        
        // Optimize touch targets
        this.optimizeTouchTargets();
        
        // Reduce animations for better performance
        if (window.animationManager) {
            document.body.classList.add('reduced-animations');
        }
    }

    optimizeForTablet() {
        document.body.classList.add('tablet-layout');
        
        // Optimize for tablet interactions
        this.optimizeTabletInteractions();
    }

    optimizeForDesktop() {
        document.body.classList.add('desktop-layout');
        
        // Enable hover effects
        this.enableHoverEffects();
    }

    createMobileMenuToggle() {
        const header = document.querySelector('.header');
        if (!header) return;

        const toggle = document.createElement('button');
        toggle.className = 'mobile-menu-toggle';
        toggle.innerHTML = '☰';
        toggle.setAttribute('aria-label', 'Abrir menú');
        toggle.setAttribute('aria-expanded', 'false');
        
        toggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        header.insertBefore(toggle, header.firstChild);
    }

    toggleMobileMenu() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (!sidebar) return;

        const isOpen = sidebar.classList.contains('open');
        
        if (isOpen) {
            sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('show');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
                toggle.innerHTML = '☰';
            }
        } else {
            sidebar.classList.add('open');
            if (overlay) overlay.classList.add('show');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'true');
                toggle.innerHTML = '✕';
            }
        }
    }

    optimizeTouchTargets() {
        // Ensure minimum touch target size
        const touchTargets = document.querySelectorAll('.btn, .nav-item, .card');
        touchTargets.forEach(target => {
            target.classList.add('touch-target');
        });
    }

    optimizeTabletInteractions() {
        // Add tablet-specific optimizations
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.classList.add('tablet-optimized');
        });
    }

    enableHoverEffects() {
        // Enable hover effects for desktop
        const hoverElements = document.querySelectorAll('.card, .btn, .nav-item');
        hoverElements.forEach(element => {
            element.classList.add('hover-enabled');
        });
    }

    updateLayout() {
        // Update layout based on current breakpoint
        const elements = document.querySelectorAll('[data-responsive]');
        elements.forEach(element => {
            const responsiveClasses = element.dataset.responsive.split(' ');
            responsiveClasses.forEach(cls => {
                const [breakpoint, className] = cls.split(':');
                if (this.currentBreakpoint === breakpoint) {
                    element.classList.add(className);
                } else {
                    element.classList.remove(className);
                }
            });
        });
    }

    dispatchBreakpointChange() {
        document.dispatchEvent(new CustomEvent('breakpoint-change', {
            detail: {
                breakpoint: this.currentBreakpoint,
                isMobile: this.isMobile,
                isTablet: this.isTablet,
                isDesktop: this.isDesktop,
                width: window.innerWidth,
                height: window.innerHeight
            }
        }));
    }

    // Public methods
    getCurrentBreakpoint() {
        return this.currentBreakpoint;
    }

    isBreakpoint(breakpoint) {
        return this.currentBreakpoint === breakpoint;
    }

    isMobileDevice() {
        return this.isMobile;
    }

    isTabletDevice() {
        return this.isTablet;
    }

    isDesktopDevice() {
        return this.isDesktop;
    }

    getViewportSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    // Utility methods for responsive behavior
    showOnBreakpoint(element, breakpoint) {
        if (this.currentBreakpoint === breakpoint) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }

    hideOnBreakpoint(element, breakpoint) {
        if (this.currentBreakpoint === breakpoint) {
            element.style.display = 'none';
        } else {
            element.style.display = 'block';
        }
    }

    // Responsive image handling
    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }
        });
    }

    // Responsive table handling
    makeTablesResponsive() {
        const tables = document.querySelectorAll('table');
        tables.forEach(table => {
            if (!table.closest('.table-responsive')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-responsive';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        });
    }
}

// Global responsive manager instance
window.responsiveManager = new ResponsiveManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResponsiveManager;
}
