/**
 * AIAIAI Consulting - Real-time Notifications System
 * Sistema de notificaciones en tiempo real
 */

class NotificationManager {
    constructor() {
        this.notifications = [];
        this.maxNotifications = 5;
        this.autoHideDelay = 5000;
        this.init();
    }

    init() {
        this.createNotificationContainer();
        this.startRealTimeUpdates();
    }

    createNotificationContainer() {
        // Create notification container if it doesn't exist
        if (!document.querySelector('.notification-container')) {
            const container = document.createElement('div');
            container.className = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-width: 400px;
            `;
            document.body.appendChild(container);
        }
    }

    showNotification(type, title, message, options = {}) {
        const notification = {
            id: Date.now() + Math.random(),
            type: type, // 'success', 'error', 'warning', 'info'
            title: title,
            message: message,
            timestamp: new Date(),
            autoHide: options.autoHide !== false,
            duration: options.duration || this.autoHideDelay,
            actions: options.actions || []
        };

        this.notifications.push(notification);
        this.renderNotification(notification);

        // Auto-hide if enabled
        if (notification.autoHide) {
            setTimeout(() => {
                this.hideNotification(notification.id);
            }, notification.duration);
        }

        return notification.id;
    }

    renderNotification(notification) {
        const container = document.querySelector('.notification-container');
        const notificationElement = document.createElement('div');
        notificationElement.className = `notification notification-${notification.type}`;
        notificationElement.setAttribute('data-id', notification.id);
        
        notificationElement.style.cssText = `
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            padding: 1rem;
            border-left: 4px solid ${this.getTypeColor(notification.type)};
            transform: translateX(100%);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        `;

        const icon = this.getTypeIcon(notification.type);
        const timeAgo = this.getTimeAgo(notification.timestamp);

        notificationElement.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
                <div style="
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: ${this.getTypeColor(notification.type)};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 12px;
                    flex-shrink: 0;
                ">${icon}</div>
                
                <div style="flex: 1; min-width: 0;">
                    <div style="
                        font-weight: 600;
                        color: #1f2937;
                        margin-bottom: 0.25rem;
                        font-size: 0.875rem;
                    ">${notification.title}</div>
                    
                    <div style="
                        color: #6b7280;
                        font-size: 0.75rem;
                        line-height: 1.4;
                        margin-bottom: 0.5rem;
                    ">${notification.message}</div>
                    
                    <div style="
                        color: #9ca3af;
                        font-size: 0.625rem;
                    ">${timeAgo}</div>
                </div>
                
                <button onclick="notificationManager.hideNotification(${notification.id})" style="
                    background: none;
                    border: none;
                    color: #9ca3af;
                    cursor: pointer;
                    padding: 0;
                    font-size: 16px;
                    line-height: 1;
                ">&times;</button>
            </div>
            
            ${notification.actions.length > 0 ? `
                <div style="
                    margin-top: 0.75rem;
                    display: flex;
                    gap: 0.5rem;
                ">
                    ${notification.actions.map(action => `
                        <button onclick="${action.onclick}" style="
                            padding: 0.25rem 0.75rem;
                            background: ${this.getTypeColor(notification.type)};
                            color: white;
                            border: none;
                            border-radius: 6px;
                            font-size: 0.75rem;
                            cursor: pointer;
                        ">${action.label}</button>
                    `).join('')}
                </div>
            ` : ''}
        `;

        container.appendChild(notificationElement);

        // Animate in
        setTimeout(() => {
            notificationElement.style.transform = 'translateX(0)';
        }, 100);

        // Limit number of notifications
        if (this.notifications.length > this.maxNotifications) {
            const oldestNotification = this.notifications.shift();
            this.hideNotification(oldestNotification.id);
        }
    }

    hideNotification(id) {
        const notificationElement = document.querySelector(`[data-id="${id}"]`);
        if (notificationElement) {
            notificationElement.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notificationElement.remove();
            }, 300);
        }

        // Remove from array
        this.notifications = this.notifications.filter(n => n.id !== id);
    }

    getTypeColor(type) {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        return colors[type] || colors.info;
    }

    getTypeIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (seconds < 60) return 'hace un momento';
        if (minutes < 60) return `hace ${minutes} min`;
        if (hours < 24) return `hace ${hours}h`;
        return timestamp.toLocaleDateString();
    }

    startRealTimeUpdates() {
        // Simulate real-time notifications
        setInterval(() => {
            this.generateRandomNotification();
        }, 30000); // Every 30 seconds

        // Listen for custom events
        document.addEventListener('agent-updated', (e) => {
            this.showNotification('success', 'Agente Actualizado', 
                `El agente ${e.detail.agentName} ha sido actualizado correctamente.`);
        });

        document.addEventListener('client-added', (e) => {
            this.showNotification('info', 'Nuevo Cliente', 
                `Se ha agregado un nuevo cliente: ${e.detail.clientName}.`);
        });

        document.addEventListener('project-completed', (e) => {
            this.showNotification('success', 'Proyecto Completado', 
                `El proyecto "${e.detail.projectName}" ha sido completado exitosamente.`, {
                actions: [
                    { label: 'Ver Proyecto', onclick: `window.location.href='projects.html'` }
                ]
            });
        });

        document.addEventListener('system-alert', (e) => {
            this.showNotification('warning', 'Alerta del Sistema', e.detail.message);
        });
    }

    generateRandomNotification() {
        const notifications = [
            {
                type: 'info',
                title: 'Nuevo Lead',
                message: 'Se ha recibido un nuevo lead desde el sitio web.'
            },
            {
                type: 'success',
                title: 'Agente Activo',
                message: 'El Lead Scorer ha procesado 15 nuevos leads esta hora.'
            },
            {
                type: 'warning',
                title: 'Proyecto en Retraso',
                message: 'El proyecto "Automatización CRM" está 2 días atrasado.'
            },
            {
                type: 'info',
                title: 'Backup Completado',
                message: 'El backup diario se ha completado exitosamente.'
            },
            {
                type: 'success',
                title: 'Factura Generada',
                message: 'Se ha generado automáticamente la factura #INV-2025-001.'
            }
        ];

        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        this.showNotification(randomNotification.type, randomNotification.title, randomNotification.message);
    }

    // Public methods for external use
    success(title, message, options = {}) {
        return this.showNotification('success', title, message, options);
    }

    error(title, message, options = {}) {
        return this.showNotification('error', title, message, options);
    }

    warning(title, message, options = {}) {
        return this.showNotification('warning', title, message, options);
    }

    info(title, message, options = {}) {
        return this.showNotification('info', title, message, options);
    }

    // Clear all notifications
    clearAll() {
        this.notifications.forEach(notification => {
            this.hideNotification(notification.id);
        });
    }
}

// Global notification manager instance
window.notificationManager = new NotificationManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationManager;
}
