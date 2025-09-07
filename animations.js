/**
 * AIAIAI Consulting - Advanced Animations System
 * Sistema de animaciones y micro-interacciones avanzado
 */

class AnimationManager {
    constructor() {
        this.animations = new Map();
        this.intersectionObserver = null;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.addAnimationStyles();
        this.initializePageAnimations();
    }

    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Fade In Animations */
            .fade-in {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }

            /* Slide In Animations */
            .slide-in-left {
                opacity: 0;
                transform: translateX(-30px);
                transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .slide-in-left.visible {
                opacity: 1;
                transform: translateX(0);
            }

            .slide-in-right {
                opacity: 0;
                transform: translateX(30px);
                transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .slide-in-right.visible {
                opacity: 1;
                transform: translateX(0);
            }

            /* Scale In Animations */
            .scale-in {
                opacity: 0;
                transform: scale(0.9);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .scale-in.visible {
                opacity: 1;
                transform: scale(1);
            }

            /* Stagger Animation */
            .stagger-item {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .stagger-item.visible {
                opacity: 1;
                transform: translateY(0);
            }

            /* Hover Animations */
            .hover-lift {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .hover-lift:hover {
                transform: translateY(-4px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            }

            .hover-scale {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .hover-scale:hover {
                transform: scale(1.05);
            }

            .hover-glow {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .hover-glow:hover {
                box-shadow: 0 0 20px rgba(58, 134, 255, 0.3);
            }

            /* Button Animations */
            .btn-animated {
                position: relative;
                overflow: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .btn-animated::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transition: left 0.5s;
            }

            .btn-animated:hover::before {
                left: 100%;
            }

            .btn-animated:active {
                transform: scale(0.98);
            }

            /* Loading Animations */
            .loading-spinner {
                width: 20px;
                height: 20px;
                border: 2px solid var(--border);
                border-top: 2px solid var(--primary);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            .loading-dots {
                display: inline-flex;
                gap: 4px;
            }

            .loading-dots span {
                width: 6px;
                height: 6px;
                background: var(--primary);
                border-radius: 50%;
                animation: bounce 1.4s ease-in-out infinite both;
            }

            .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
            .loading-dots span:nth-child(2) { animation-delay: -0.16s; }

            @keyframes bounce {
                0%, 80%, 100% {
                    transform: scale(0);
                }
                40% {
                    transform: scale(1);
                }
            }

            /* Pulse Animation */
            .pulse {
                animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }

            @keyframes pulse {
                0%, 100% {
                    opacity: 1;
                }
                50% {
                    opacity: .5;
                }
            }

            /* Shake Animation */
            .shake {
                animation: shake 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
                20%, 40%, 60%, 80% { transform: translateX(2px); }
            }

            /* Success Animation */
            .success-checkmark {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: block;
                stroke-width: 2;
                stroke: #10b981;
                stroke-miterlimit: 10;
                box-shadow: inset 0px 0px 0px #10b981;
                animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
            }

            .success-checkmark circle {
                stroke-dasharray: 166;
                stroke-dashoffset: 166;
                stroke-linecap: round;
                stroke-miterlimit: 10;
                animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
            }

            .success-checkmark path {
                transform-origin: 50% 50%;
                stroke-dasharray: 48;
                stroke-dashoffset: 48;
                animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
            }

            @keyframes stroke {
                100% {
                    stroke-dashoffset: 0;
                }
            }

            @keyframes scale {
                0%, 100% {
                    transform: none;
                }
                50% {
                    transform: scale3d(1.1, 1.1, 1);
                }
            }

            @keyframes fill {
                100% {
                    box-shadow: inset 0px 0px 0px 30px #10b981;
                }
            }

            /* Skeleton Loading */
            .skeleton {
                background: linear-gradient(90deg, var(--border) 25%, var(--background) 50%, var(--border) 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
                border-radius: 4px;
            }

            @keyframes loading {
                0% {
                    background-position: 200% 0;
                }
                100% {
                    background-position: -200% 0;
                }
            }

            /* Smooth Transitions */
            * {
                transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
            }

            /* Focus States */
            .focus-ring:focus {
                outline: none;
                box-shadow: 0 0 0 3px rgba(58, 134, 255, 0.3);
                border-color: var(--primary);
            }

            /* Custom Scrollbar */
            ::-webkit-scrollbar {
                width: 8px;
            }

            ::-webkit-scrollbar-track {
                background: var(--background);
            }

            ::-webkit-scrollbar-thumb {
                background: var(--border);
                border-radius: 4px;
            }

            ::-webkit-scrollbar-thumb:hover {
                background: var(--text-secondary);
            }
        `;
        document.head.appendChild(style);
    }

    setupIntersectionObserver() {
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Handle stagger animations
                    if (entry.target.classList.contains('stagger-container')) {
                        this.animateStaggerItems(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }

    initializePageAnimations() {
        // Add animation classes to elements
        this.addAnimationClasses();
        
        // Observe elements for animations
        this.observeElements();
        
        // Add hover effects
        this.addHoverEffects();
        
        // Add button animations
        this.addButtonAnimations();
    }

    addAnimationClasses() {
        // Add fade-in to cards and sections
        const cards = document.querySelectorAll('.card, .metric-card, .agent-card, .client-card, .project-card');
        cards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Add slide-in to navigation items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            item.classList.add('slide-in-left');
            item.style.animationDelay = `${index * 0.1}s`;
        });

        // Add scale-in to modals
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.add('scale-in');
        });

        // Add stagger to lists
        const lists = document.querySelectorAll('.agent-list, .client-list, .project-list');
        lists.forEach(list => {
            list.classList.add('stagger-container');
            const items = list.querySelectorAll('.agent-item, .client-item, .project-item');
            items.forEach((item, index) => {
                item.classList.add('stagger-item');
                item.style.animationDelay = `${index * 0.1}s`;
            });
        });
    }

    observeElements() {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .stagger-container');
        animatedElements.forEach(element => {
            this.intersectionObserver.observe(element);
        });
    }

    addHoverEffects() {
        // Add hover effects to cards
        const cards = document.querySelectorAll('.card, .metric-card, .agent-card, .client-card, .project-card');
        cards.forEach(card => {
            card.classList.add('hover-lift');
        });

        // Add hover effects to buttons
        const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary');
        buttons.forEach(button => {
            button.classList.add('hover-scale');
        });

        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('.nav-item, .sidebar-item');
        interactiveElements.forEach(element => {
            element.classList.add('hover-glow');
        });
    }

    addButtonAnimations() {
        const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary');
        buttons.forEach(button => {
            button.classList.add('btn-animated');
        });
    }

    animateStaggerItems(container) {
        const items = container.querySelectorAll('.stagger-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 100);
        });
    }

    // Public methods
    showLoading(element, type = 'spinner') {
        const loadingElement = document.createElement('div');
        loadingElement.className = `loading-${type}`;
        
        if (type === 'dots') {
            loadingElement.innerHTML = '<span></span><span></span><span></span>';
        }
        
        element.appendChild(loadingElement);
        return loadingElement;
    }

    hideLoading(element) {
        const loadingElement = element.querySelector('.loading-spinner, .loading-dots');
        if (loadingElement) {
            loadingElement.remove();
        }
    }

    showSuccess(element) {
        const successElement = document.createElement('div');
        successElement.className = 'success-checkmark';
        successElement.innerHTML = `
            <svg viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="25" fill="none"/>
                <path fill="none" d="m14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
        `;
        
        element.appendChild(successElement);
        
        setTimeout(() => {
            successElement.remove();
        }, 2000);
    }

    shake(element) {
        element.classList.add('shake');
        setTimeout(() => {
            element.classList.remove('shake');
        }, 500);
    }

    pulse(element) {
        element.classList.add('pulse');
        setTimeout(() => {
            element.classList.remove('pulse');
        }, 2000);
    }

    // Page transition animations
    animatePageTransition(direction = 'fade') {
        const body = document.body;
        body.style.opacity = '0';
        body.style.transform = direction === 'slide' ? 'translateX(20px)' : 'scale(0.98)';
        
        setTimeout(() => {
            body.style.opacity = '1';
            body.style.transform = 'none';
        }, 100);
    }

    // Smooth scroll to element
    smoothScrollTo(element, offset = 0) {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // Animate counter
    animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    // Animate progress bar
    animateProgressBar(element, target, duration = 1000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.style.width = `${current}%`;
        }, 16);
    }
}

// Global animation manager instance
window.animationManager = new AnimationManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationManager;
}
