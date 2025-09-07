/**
 * AIAIAI Consulting - Accessibility System
 * Sistema de mejoras de accesibilidad y WCAG 2.1 AA
 */

class AccessibilityManager {
    constructor() {
        this.isEnabled = true;
        this.currentFocus = null;
        this.focusHistory = [];
        this.init();
    }

    init() {
        this.addAccessibilityStyles();
        this.setupKeyboardNavigation();
        this.setupScreenReaderSupport();
        this.setupColorContrast();
        this.setupFocusManagement();
        this.setupAriaLabels();
        this.setupSkipLinks();
    }

    addAccessibilityStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Skip Links */
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                background: var(--primary);
                color: white;
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                z-index: 10000;
                font-weight: 500;
                transition: top 0.3s ease;
            }

            .skip-link:focus {
                top: 6px;
            }

            /* Focus Indicators */
            .focus-visible {
                outline: 2px solid var(--primary);
                outline-offset: 2px;
            }

            .focus-ring:focus {
                outline: 2px solid var(--primary);
                outline-offset: 2px;
                box-shadow: 0 0 0 4px rgba(58, 134, 255, 0.2);
            }

            /* High Contrast Mode */
            @media (prefers-contrast: high) {
                :root {
                    --primary: #0000ff;
                    --text-primary: #000000;
                    --text-secondary: #333333;
                    --background: #ffffff;
                    --surface: #ffffff;
                    --border: #000000;
                }
            }

            /* Reduced Motion */
            @media (prefers-reduced-motion: reduce) {
                * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }

            /* Screen Reader Only */
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }

            .sr-only-focusable:focus {
                position: static;
                width: auto;
                height: auto;
                padding: inherit;
                margin: inherit;
                overflow: visible;
                clip: auto;
                white-space: normal;
            }

            /* Live Region for Announcements */
            .live-region {
                position: absolute;
                left: -10000px;
                width: 1px;
                height: 1px;
                overflow: hidden;
            }

            /* Accessible Button States */
            .btn:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }

            .btn:disabled:focus {
                outline: none;
            }

            /* Accessible Form Controls */
            .form-control:invalid {
                border-color: var(--error);
                box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
            }

            .form-control:invalid:focus {
                outline: 2px solid var(--error);
                outline-offset: 2px;
            }

            /* Error Messages */
            .error-message {
                color: var(--error);
                font-size: 0.875rem;
                margin-top: 0.25rem;
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }

            .error-message::before {
                content: '⚠️';
                font-size: 0.75rem;
            }

            /* Success Messages */
            .success-message {
                color: var(--success);
                font-size: 0.875rem;
                margin-top: 0.25rem;
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }

            .success-message::before {
                content: '✅';
                font-size: 0.75rem;
            }

            /* Accessible Tables */
            .table th {
                background: var(--background);
                font-weight: 600;
                text-align: left;
                padding: 0.75rem;
                border-bottom: 2px solid var(--border);
            }

            .table td {
                padding: 0.75rem;
                border-bottom: 1px solid var(--border);
            }

            .table tbody tr:hover {
                background: var(--background);
            }

            /* Accessible Modals */
            .modal[aria-hidden="true"] {
                display: none;
            }

            .modal[aria-hidden="false"] {
                display: block;
            }

            /* Accessible Navigation */
            .nav-item[aria-current="page"] {
                background: var(--primary);
                color: white;
            }

            .nav-item[aria-current="page"]:focus {
                outline: 2px solid white;
                outline-offset: 2px;
            }

            /* Accessible Cards */
            .card:focus-within {
                outline: 2px solid var(--primary);
                outline-offset: 2px;
            }

            /* Accessible Charts */
            .chart-container:focus {
                outline: 2px solid var(--primary);
                outline-offset: 2px;
            }

            /* Accessible Loading States */
            .loading[aria-live="polite"] {
                position: relative;
            }

            /* Accessible Notifications */
            .notification[role="alert"] {
                border-left: 4px solid var(--error);
            }

            .notification[role="status"] {
                border-left: 4px solid var(--success);
            }

            /* Accessible Search */
            .search-input:focus {
                outline: 2px solid var(--primary);
                outline-offset: 2px;
            }

            /* Accessible Dropdowns */
            .dropdown-menu:focus-within {
                outline: 2px solid var(--primary);
                outline-offset: 2px;
            }

            /* Accessible Tabs */
            .tab-list[role="tablist"] {
                display: flex;
                border-bottom: 1px solid var(--border);
            }

            .tab[role="tab"] {
                padding: 0.75rem 1rem;
                border: none;
                background: none;
                cursor: pointer;
                border-bottom: 2px solid transparent;
            }

            .tab[role="tab"]:focus {
                outline: 2px solid var(--primary);
                outline-offset: 2px;
            }

            .tab[role="tab"][aria-selected="true"] {
                border-bottom-color: var(--primary);
                color: var(--primary);
            }

            .tab-panel[role="tabpanel"] {
                padding: 1rem;
            }

            /* Accessible Accordions */
            .accordion-header {
                width: 100%;
                padding: 1rem;
                border: none;
                background: var(--surface);
                text-align: left;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .accordion-header:focus {
                outline: 2px solid var(--primary);
                outline-offset: 2px;
            }

            .accordion-header[aria-expanded="true"] {
                background: var(--background);
            }

            .accordion-content {
                padding: 1rem;
                border-top: 1px solid var(--border);
            }

            /* Accessible Tooltips */
            .tooltip {
                position: relative;
                display: inline-block;
            }

            .tooltip-content {
                visibility: hidden;
                opacity: 0;
                position: absolute;
                bottom: 125%;
                left: 50%;
                transform: translateX(-50%);
                background: var(--dark);
                color: white;
                padding: 0.5rem;
                border-radius: 4px;
                font-size: 0.875rem;
                white-space: nowrap;
                z-index: 1000;
                transition: all 0.3s ease;
            }

            .tooltip-content::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                border: 5px solid transparent;
                border-top-color: var(--dark);
            }

            .tooltip:hover .tooltip-content,
            .tooltip:focus .tooltip-content {
                visibility: visible;
                opacity: 1;
            }

            /* Accessible Progress Bars */
            .progress-bar {
                width: 100%;
                height: 8px;
                background: var(--border);
                border-radius: 4px;
                overflow: hidden;
            }

            .progress-fill {
                height: 100%;
                background: var(--primary);
                transition: width 0.3s ease;
            }

            /* Accessible Toggle Switches */
            .toggle-switch {
                position: relative;
                display: inline-block;
                width: 44px;
                height: 24px;
            }

            .toggle-switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }

            .toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: var(--border);
                transition: 0.3s;
                border-radius: 24px;
            }

            .toggle-slider:before {
                position: absolute;
                content: '';
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 3px;
                background: white;
                transition: 0.3s;
                border-radius: 50%;
            }

            .toggle-switch input:checked + .toggle-slider {
                background: var(--primary);
            }

            .toggle-switch input:checked + .toggle-slider:before {
                transform: translateX(20px);
            }

            .toggle-switch input:focus + .toggle-slider {
                outline: 2px solid var(--primary);
                outline-offset: 2px;
            }

            /* Accessible Color Indicators */
            .color-indicator {
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                margin-right: 0.5rem;
                border: 1px solid var(--border);
            }

            /* Accessible Status Indicators */
            .status-indicator {
                display: inline-flex;
                align-items: center;
                gap: 0.25rem;
                font-size: 0.875rem;
                font-weight: 500;
            }

            .status-indicator::before {
                content: '';
                width: 8px;
                height: 8px;
                border-radius: 50%;
            }

            .status-indicator.active::before {
                background: var(--success);
            }

            .status-indicator.inactive::before {
                background: var(--error);
            }

            .status-indicator.pending::before {
                background: var(--warning);
            }

            /* Accessible Icons */
            .icon {
                display: inline-block;
                width: 1em;
                height: 1em;
                fill: currentColor;
            }

            .icon-button {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                border: none;
                background: none;
                cursor: pointer;
                border-radius: 6px;
                transition: all 0.2s ease;
            }

            .icon-button:focus {
                outline: 2px solid var(--primary);
                outline-offset: 2px;
            }

            .icon-button:hover {
                background: var(--background);
            }

            /* Accessible Lists */
            .list-item {
                padding: 0.75rem;
                border-bottom: 1px solid var(--border);
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .list-item:focus {
                outline: 2px solid var(--primary);
                outline-offset: 2px;
            }

            .list-item:hover {
                background: var(--background);
            }

            .list-item[aria-selected="true"] {
                background: var(--primary);
                color: white;
            }

            /* Accessible Pagination */
            .pagination {
                display: flex;
                gap: 0.25rem;
                align-items: center;
            }

            .pagination-button {
                padding: 0.5rem 0.75rem;
                border: 1px solid var(--border);
                background: var(--surface);
                cursor: pointer;
                border-radius: 4px;
                transition: all 0.2s ease;
            }

            .pagination-button:focus {
                outline: 2px solid var(--primary);
                outline-offset: 2px;
            }

            .pagination-button:hover {
                background: var(--background);
            }

            .pagination-button[aria-current="page"] {
                background: var(--primary);
                color: white;
                border-color: var(--primary);
            }

            .pagination-button:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
        `;
        document.head.appendChild(style);
    }

    setupKeyboardNavigation() {
        // Tab navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            } else if (e.key === 'Escape') {
                this.handleEscapeKey(e);
            } else if (e.key === 'Enter' || e.key === ' ') {
                this.handleActivationKey(e);
            }
        });

        // Arrow key navigation for custom components
        document.addEventListener('keydown', (e) => {
            if (e.key.startsWith('Arrow')) {
                this.handleArrowNavigation(e);
            }
        });
    }

    setupScreenReaderSupport() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.className = 'live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);

        // Announce page changes
        this.announcePageChange();
    }

    setupColorContrast() {
        // Check for high contrast mode preference
        const mediaQuery = window.matchMedia('(prefers-contrast: high)');
        this.handleContrastChange(mediaQuery);
        mediaQuery.addEventListener('change', this.handleContrastChange);
    }

    setupFocusManagement() {
        // Track focus changes
        document.addEventListener('focusin', (e) => {
            this.currentFocus = e.target;
            this.focusHistory.push(e.target);
            
            // Limit focus history
            if (this.focusHistory.length > 10) {
                this.focusHistory.shift();
            }
        });

        // Handle focus trapping in modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleFocusTrap(e);
            }
        });
    }

    setupAriaLabels() {
        // Add ARIA labels to interactive elements
        this.addAriaLabels();
        
        // Update ARIA labels dynamically
        this.observeAriaChanges();
    }

    setupSkipLinks() {
        // Create skip links
        this.createSkipLinks();
    }

    // Keyboard navigation handlers
    handleTabNavigation(e) {
        const focusableElements = this.getFocusableElements();
        const currentIndex = focusableElements.indexOf(this.currentFocus);
        
        if (e.shiftKey) {
            // Shift + Tab (backward)
            if (currentIndex <= 0) {
                e.preventDefault();
                focusableElements[focusableElements.length - 1].focus();
            }
        } else {
            // Tab (forward)
            if (currentIndex >= focusableElements.length - 1) {
                e.preventDefault();
                focusableElements[0].focus();
            }
        }
    }

    handleEscapeKey(e) {
        // Close modals, dropdowns, etc.
        const modals = document.querySelectorAll('.modal[aria-hidden="false"]');
        modals.forEach(modal => {
            this.closeModal(modal);
        });
    }

    handleActivationKey(e) {
        const target = e.target;
        
        // Handle custom button-like elements
        if (target.getAttribute('role') === 'button' && !target.disabled) {
            e.preventDefault();
            target.click();
        }
    }

    handleArrowNavigation(e) {
        const target = e.target;
        const parent = target.closest('[role="menu"], [role="tablist"], [role="listbox"]');
        
        if (!parent) return;
        
        e.preventDefault();
        const items = Array.from(parent.querySelectorAll('[role="menuitem"], [role="tab"], [role="option"]'));
        const currentIndex = items.indexOf(target);
        
        let nextIndex;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            nextIndex = (currentIndex + 1) % items.length;
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            nextIndex = (currentIndex - 1 + items.length) % items.length;
        }
        
        if (nextIndex !== undefined) {
            items[nextIndex].focus();
        }
    }

    handleContrastChange(mediaQuery) {
        if (mediaQuery.matches) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
    }

    handleFocusTrap(e) {
        const modal = document.querySelector('.modal[aria-hidden="false"]');
        if (!modal) return;
        
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    // Utility methods
    getFocusableElements() {
        return Array.from(document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )).filter(element => {
            return !element.disabled && !element.hidden && 
                   getComputedStyle(element).visibility !== 'hidden';
        });
    }

    addAriaLabels() {
        // Add ARIA labels to buttons without text
        const iconButtons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
        iconButtons.forEach(button => {
            const icon = button.querySelector('svg, .icon');
            if (icon && !button.textContent.trim()) {
                button.setAttribute('aria-label', 'Botón');
            }
        });

        // Add ARIA labels to form controls
        const formControls = document.querySelectorAll('input, select, textarea');
        formControls.forEach(control => {
            if (!control.getAttribute('aria-label') && !control.getAttribute('aria-labelledby')) {
                const label = document.querySelector(`label[for="${control.id}"]`);
                if (label) {
                    control.setAttribute('aria-labelledby', label.id || 'label-' + control.id);
                }
            }
        });
    }

    observeAriaChanges() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    this.addAriaLabels();
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    createSkipLinks() {
        const skipLinks = [
            { href: '#main-content', text: 'Saltar al contenido principal' },
            { href: '#navigation', text: 'Saltar a la navegación' },
            { href: '#search', text: 'Saltar a la búsqueda' }
        ];
        
        skipLinks.forEach(link => {
            const skipLink = document.createElement('a');
            skipLink.href = link.href;
            skipLink.textContent = link.text;
            skipLink.className = 'skip-link';
            document.body.insertBefore(skipLink, document.body.firstChild);
        });
    }

    announcePageChange() {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            const pageTitle = document.title;
            liveRegion.textContent = `Página cargada: ${pageTitle}`;
        }
    }

    // Public methods
    announce(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }

    focusElement(element) {
        if (element) {
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    closeModal(modal) {
        modal.setAttribute('aria-hidden', 'true');
        modal.style.display = 'none';
        
        // Return focus to trigger element
        const trigger = document.querySelector(`[aria-controls="${modal.id}"]`);
        if (trigger) {
            trigger.focus();
        }
    }

    openModal(modal) {
        modal.setAttribute('aria-hidden', 'false');
        modal.style.display = 'block';
        
        // Focus first focusable element
        const firstFocusable = modal.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }

    setAriaExpanded(element, expanded) {
        element.setAttribute('aria-expanded', expanded.toString());
    }

    setAriaSelected(element, selected) {
        element.setAttribute('aria-selected', selected.toString());
    }

    setAriaCurrent(element, current) {
        element.setAttribute('aria-current', current);
    }

    // Enable/disable accessibility features
    enable() {
        this.isEnabled = true;
        document.body.classList.add('accessibility-enabled');
    }

    disable() {
        this.isEnabled = false;
        document.body.classList.remove('accessibility-enabled');
    }
}

// Global accessibility manager instance
window.accessibilityManager = new AccessibilityManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityManager;
}
