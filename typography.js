/**
 * AIAIAI Consulting - Typography & Visual Hierarchy System
 * Sistema de tipografía y jerarquía visual optimizado
 */

class TypographyManager {
    constructor() {
        this.fontStack = {
            primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            secondary: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
            mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace'
        };
        this.scale = {
            xs: '0.75rem',    // 12px
            sm: '0.875rem',   // 14px
            base: '1rem',     // 16px
            lg: '1.125rem',   // 18px
            xl: '1.25rem',    // 20px
            '2xl': '1.5rem',  // 24px
            '3xl': '1.875rem', // 30px
            '4xl': '2.25rem', // 36px
            '5xl': '3rem',    // 48px
            '6xl': '3.75rem'  // 60px
        };
        this.lineHeights = {
            tight: '1.25',
            snug: '1.375',
            normal: '1.5',
            relaxed: '1.625',
            loose: '2'
        };
        this.fontWeights = {
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800'
        };
        this.init();
    }

    init() {
        this.addTypographyStyles();
        this.optimizeTextRendering();
        this.setupFontLoading();
        this.enhanceReadability();
        this.createTextStyles();
    }

    addTypographyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Import Inter font */
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

            /* Base typography */
            html {
                font-size: 16px;
                line-height: 1.5;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                text-rendering: optimizeLegibility;
            }

            body {
                font-family: ${this.fontStack.primary};
                font-size: ${this.scale.base};
                line-height: ${this.lineHeights.normal};
                font-weight: ${this.fontWeights.normal};
                color: var(--text-primary);
                background: var(--background);
            }

            /* Headings */
            h1, h2, h3, h4, h5, h6 {
                font-family: ${this.fontStack.primary};
                font-weight: ${this.fontWeights.bold};
                line-height: ${this.lineHeights.tight};
                color: var(--text-primary);
                margin: 0 0 1rem 0;
                letter-spacing: -0.025em;
            }

            h1 {
                font-size: ${this.scale['4xl']};
                font-weight: ${this.fontWeights.extrabold};
                line-height: ${this.lineHeights.tight};
                letter-spacing: -0.05em;
            }

            h2 {
                font-size: ${this.scale['3xl']};
                font-weight: ${this.fontWeights.bold};
                line-height: ${this.lineHeights.snug};
            }

            h3 {
                font-size: ${this.scale['2xl']};
                font-weight: ${this.fontWeights.semibold};
                line-height: ${this.lineHeights.snug};
            }

            h4 {
                font-size: ${this.scale.xl};
                font-weight: ${this.fontWeights.semibold};
                line-height: ${this.lineHeights.normal};
            }

            h5 {
                font-size: ${this.scale.lg};
                font-weight: ${this.fontWeights.medium};
                line-height: ${this.lineHeights.normal};
            }

            h6 {
                font-size: ${this.scale.base};
                font-weight: ${this.fontWeights.medium};
                line-height: ${this.lineHeights.normal};
            }

            /* Paragraphs */
            p {
                margin: 0 0 1rem 0;
                line-height: ${this.lineHeights.relaxed};
                color: var(--text-primary);
            }

            .lead {
                font-size: ${this.scale.lg};
                font-weight: ${this.fontWeights.normal};
                line-height: ${this.lineHeights.relaxed};
                color: var(--text-secondary);
            }

            /* Text sizes */
            .text-xs { font-size: ${this.scale.xs}; }
            .text-sm { font-size: ${this.scale.sm}; }
            .text-base { font-size: ${this.scale.base}; }
            .text-lg { font-size: ${this.scale.lg}; }
            .text-xl { font-size: ${this.scale.xl}; }
            .text-2xl { font-size: ${this.scale['2xl']}; }
            .text-3xl { font-size: ${this.scale['3xl']}; }
            .text-4xl { font-size: ${this.scale['4xl']}; }
            .text-5xl { font-size: ${this.scale['5xl']}; }
            .text-6xl { font-size: ${this.scale['6xl']}; }

            /* Font weights */
            .font-light { font-weight: ${this.fontWeights.light}; }
            .font-normal { font-weight: ${this.fontWeights.normal}; }
            .font-medium { font-weight: ${this.fontWeights.medium}; }
            .font-semibold { font-weight: ${this.fontWeights.semibold}; }
            .font-bold { font-weight: ${this.fontWeights.bold}; }
            .font-extrabold { font-weight: ${this.fontWeights.extrabold}; }

            /* Line heights */
            .leading-tight { line-height: ${this.lineHeights.tight}; }
            .leading-snug { line-height: ${this.lineHeights.snug}; }
            .leading-normal { line-height: ${this.lineHeights.normal}; }
            .leading-relaxed { line-height: ${this.lineHeights.relaxed}; }
            .leading-loose { line-height: ${this.lineHeights.loose}; }

            /* Text colors */
            .text-primary { color: var(--text-primary); }
            .text-secondary { color: var(--text-secondary); }
            .text-muted { color: var(--text-secondary); opacity: 0.7; }
            .text-success { color: var(--success); }
            .text-warning { color: var(--warning); }
            .text-error { color: var(--error); }
            .text-info { color: var(--primary); }

            /* Text alignment */
            .text-left { text-align: left; }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .text-justify { text-align: justify; }

            /* Text decoration */
            .underline { text-decoration: underline; }
            .no-underline { text-decoration: none; }
            .line-through { text-decoration: line-through; }

            /* Text transform */
            .uppercase { text-transform: uppercase; }
            .lowercase { text-transform: lowercase; }
            .capitalize { text-transform: capitalize; }
            .normal-case { text-transform: none; }

            /* Letter spacing */
            .tracking-tighter { letter-spacing: -0.05em; }
            .tracking-tight { letter-spacing: -0.025em; }
            .tracking-normal { letter-spacing: 0; }
            .tracking-wide { letter-spacing: 0.025em; }
            .tracking-wider { letter-spacing: 0.05em; }
            .tracking-widest { letter-spacing: 0.1em; }

            /* Lists */
            ul, ol {
                margin: 0 0 1rem 0;
                padding-left: 1.5rem;
            }

            li {
                margin-bottom: 0.25rem;
                line-height: ${this.lineHeights.relaxed};
            }

            /* Links */
            a {
                color: var(--primary);
                text-decoration: none;
                transition: color 0.2s ease;
            }

            a:hover {
                color: var(--primary);
                text-decoration: underline;
            }

            a:focus {
                outline: 2px solid var(--primary);
                outline-offset: 2px;
            }

            /* Code */
            code, pre {
                font-family: ${this.fontStack.mono};
                font-size: ${this.scale.sm};
            }

            code {
                background: var(--background);
                padding: 0.125rem 0.25rem;
                border-radius: 0.25rem;
                color: var(--text-primary);
            }

            pre {
                background: var(--background);
                padding: 1rem;
                border-radius: 0.5rem;
                overflow-x: auto;
                line-height: ${this.lineHeights.relaxed};
                margin: 0 0 1rem 0;
            }

            /* Blockquotes */
            blockquote {
                margin: 0 0 1rem 0;
                padding: 1rem 1.5rem;
                border-left: 4px solid var(--primary);
                background: var(--background);
                font-style: italic;
                line-height: ${this.lineHeights.relaxed};
            }

            /* Small text */
            small {
                font-size: ${this.scale.sm};
                color: var(--text-secondary);
            }

            /* Mark/highlight */
            mark {
                background: var(--accent);
                color: var(--text-primary);
                padding: 0.125rem 0.25rem;
                border-radius: 0.25rem;
            }

            /* Abbreviations */
            abbr[title] {
                text-decoration: underline dotted;
                cursor: help;
            }

            /* Keyboard input */
            kbd {
                background: var(--surface);
                border: 1px solid var(--border);
                border-radius: 0.25rem;
                padding: 0.125rem 0.25rem;
                font-family: ${this.fontStack.mono};
                font-size: ${this.scale.sm};
                color: var(--text-primary);
            }

            /* Sample output */
            samp {
                font-family: ${this.fontStack.mono};
                font-size: ${this.scale.sm};
                color: var(--text-primary);
            }

            /* Variable text */
            var {
                font-style: italic;
                color: var(--text-secondary);
            }

            /* Time */
            time {
                color: var(--text-secondary);
                font-size: ${this.scale.sm};
            }

            /* Address */
            address {
                font-style: normal;
                line-height: ${this.lineHeights.relaxed};
            }

            /* Definition lists */
            dl {
                margin: 0 0 1rem 0;
            }

            dt {
                font-weight: ${this.fontWeights.semibold};
                margin-top: 0.5rem;
            }

            dd {
                margin-left: 1rem;
                margin-bottom: 0.5rem;
                color: var(--text-secondary);
            }

            /* Responsive typography */
            @media (max-width: 768px) {
                html {
                    font-size: 14px;
                }

                h1 {
                    font-size: ${this.scale['3xl']};
                }

                h2 {
                    font-size: ${this.scale['2xl']};
                }

                h3 {
                    font-size: ${this.scale.xl};
                }

                .lead {
                    font-size: ${this.scale.base};
                }
            }

            /* Print styles */
            @media print {
                body {
                    font-size: 12pt;
                    line-height: 1.4;
                    color: #000;
                }

                h1, h2, h3, h4, h5, h6 {
                    color: #000;
                    page-break-after: avoid;
                }

                p, li {
                    orphans: 3;
                    widows: 3;
                }

                a {
                    color: #000;
                    text-decoration: underline;
                }

                a[href]:after {
                    content: " (" attr(href) ")";
                    font-size: 0.8em;
                }
            }

            /* High contrast mode */
            @media (prefers-contrast: high) {
                body {
                    color: #000;
                }

                a {
                    color: #0000ff;
                }

                code, pre {
                    background: #f0f0f0;
                    border: 1px solid #000;
                }
            }

            /* Reduced motion */
            @media (prefers-reduced-motion: reduce) {
                a {
                    transition: none;
                }
            }

            /* Custom text styles */
            .text-gradient {
                background: linear-gradient(135deg, var(--primary), var(--accent));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .text-shadow {
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .text-glow {
                text-shadow: 0 0 10px var(--primary);
            }

            /* Reading width optimization */
            .reading-width {
                max-width: 65ch;
                margin: 0 auto;
            }

            .reading-width p {
                margin-bottom: 1.5rem;
            }

            /* Text truncation */
            .truncate {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .line-clamp-1 {
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .line-clamp-2 {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .line-clamp-3 {
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            /* Text selection */
            ::selection {
                background: var(--primary);
                color: white;
            }

            ::-moz-selection {
                background: var(--primary);
                color: white;
            }
        `;
        document.head.appendChild(style);
    }

    optimizeTextRendering() {
        // Optimize text rendering for better readability
        document.body.style.textRendering = 'optimizeLegibility';
        document.body.style.fontSmoothing = 'antialiased';
        document.body.style.webkitFontSmoothing = 'antialiased';
        document.body.style.mozOsxFontSmoothing = 'grayscale';
    }

    setupFontLoading() {
        // Preload critical fonts
        const fontPreload = document.createElement('link');
        fontPreload.rel = 'preload';
        fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
        fontPreload.as = 'style';
        document.head.appendChild(fontPreload);

        // Font loading optimization
        if ('fonts' in document) {
            document.fonts.ready.then(() => {
                document.body.classList.add('fonts-loaded');
            });
        }
    }

    enhanceReadability() {
        // Optimize reading experience
        const readingElements = document.querySelectorAll('p, li, .lead');
        readingElements.forEach(element => {
            element.style.maxWidth = '65ch';
        });

        // Add reading width to content areas
        const contentAreas = document.querySelectorAll('.content, .main-content, .article');
        contentAreas.forEach(area => {
            area.classList.add('reading-width');
        });
    }

    createTextStyles() {
        // Create utility classes for common text patterns
        this.addTextUtilityClasses();
        this.optimizeHeadings();
        this.enhanceLinks();
    }

    addTextUtilityClasses() {
        // Add utility classes to common elements
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
            heading.classList.add('font-bold', 'tracking-tight');
        });

        const paragraphs = document.querySelectorAll('p');
        paragraphs.forEach(p => {
            p.classList.add('leading-relaxed');
        });

        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.classList.add('transition-colors');
        });
    }

    optimizeHeadings() {
        // Optimize heading hierarchy
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((heading, index) => {
            // Add proper spacing
            heading.style.marginTop = index === 0 ? '0' : '2rem';
            heading.style.marginBottom = '1rem';
            
            // Add anchor links for better navigation
            if (heading.id) {
                const anchor = document.createElement('a');
                anchor.href = `#${heading.id}`;
                anchor.className = 'heading-anchor';
                anchor.innerHTML = '#';
                anchor.style.opacity = '0';
                anchor.style.marginLeft = '0.5rem';
                anchor.style.textDecoration = 'none';
                anchor.style.color = 'var(--text-secondary)';
                
                heading.appendChild(anchor);
                
                // Show anchor on hover
                heading.addEventListener('mouseenter', () => {
                    anchor.style.opacity = '1';
                });
                
                heading.addEventListener('mouseleave', () => {
                    anchor.style.opacity = '0';
                });
            }
        });
    }

    enhanceLinks() {
        // Enhance link accessibility and UX
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            // Add external link indicators
            if (link.hostname !== window.location.hostname) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
                link.innerHTML += ' <span aria-label="Abre en nueva ventana">↗</span>';
            }
            
            // Add focus styles
            link.addEventListener('focus', () => {
                link.style.outline = '2px solid var(--primary)';
                link.style.outlineOffset = '2px';
            });
            
            link.addEventListener('blur', () => {
                link.style.outline = 'none';
            });
        });
    }

    // Public methods
    getFontStack(family = 'primary') {
        return this.fontStack[family] || this.fontStack.primary;
    }

    getScale(size = 'base') {
        return this.scale[size] || this.scale.base;
    }

    getLineHeight(height = 'normal') {
        return this.lineHeights[height] || this.lineHeights.normal;
    }

    getFontWeight(weight = 'normal') {
        return this.fontWeights[weight] || this.fontWeights.normal;
    }

    // Utility methods
    setTextSize(element, size) {
        element.style.fontSize = this.getScale(size);
    }

    setFontWeight(element, weight) {
        element.style.fontWeight = this.getFontWeight(weight);
    }

    setLineHeight(element, height) {
        element.style.lineHeight = this.getLineHeight(height);
    }

    // Responsive typography
    updateResponsiveTypography() {
        const width = window.innerWidth;
        
        if (width < 768) {
            // Mobile typography
            document.documentElement.style.fontSize = '14px';
        } else if (width < 1024) {
            // Tablet typography
            document.documentElement.style.fontSize = '15px';
        } else {
            // Desktop typography
            document.documentElement.style.fontSize = '16px';
        }
    }

    // Text optimization
    optimizeTextContent() {
        // Optimize text content for better readability
        const textElements = document.querySelectorAll('p, li, .lead');
        textElements.forEach(element => {
            // Ensure proper line length
            if (element.textContent.length > 100) {
                element.style.maxWidth = '65ch';
            }
            
            // Add proper spacing
            element.style.marginBottom = '1rem';
        });
    }

    // Accessibility enhancements
    enhanceAccessibility() {
        // Add proper heading hierarchy
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let currentLevel = 0;
        
        headings.forEach(heading => {
            const level = parseInt(heading.tagName.charAt(1));
            
            if (level > currentLevel + 1) {
                console.warn(`Heading hierarchy skipped: ${heading.tagName} after h${currentLevel}`);
            }
            
            currentLevel = level;
        });
    }
}

// Global typography manager instance
window.typographyManager = new TypographyManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TypographyManager;
}
