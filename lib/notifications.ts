import { ToastProps } from '@/components/ui/Toast';

/**
 * Notification System
 * 
 * Features:
 * - Toast notifications
 * - Different types (success, error, warning, info)
 * - Auto-dismiss functionality
 * - Queue management
 * - Professional styling
 */

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

class NotificationManager {
  private notifications: ToastProps[] = [];
  private listeners: ((notifications: ToastProps[]) => void)[] = [];

  subscribe(listener: (notifications: ToastProps[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener([...this.notifications]));
  }

  add(notification: Omit<Notification, 'id'>) {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: ToastProps = {
      id,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      duration: notification.duration || 5000,
      onClose: this.remove.bind(this)
    };

    this.notifications.push(toast);
    this.notify();
    return id;
  }

  remove(id: string) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notify();
  }

  clear() {
    this.notifications = [];
    this.notify();
  }

  // Convenience methods
  success(title: string, message?: string, duration?: number) {
    return this.add({ type: 'success', title, message, duration });
  }

  error(title: string, message?: string, duration?: number) {
    return this.add({ type: 'error', title, message, duration: duration || 7000 });
  }

  warning(title: string, message?: string, duration?: number) {
    return this.add({ type: 'warning', title, message, duration });
  }

  info(title: string, message?: string, duration?: number) {
    return this.add({ type: 'info', title, message, duration });
  }
}

export const notifications = new NotificationManager();

// Predefined notification messages
export const NotificationMessages = {
  // Agent notifications
  AGENT_CREATED: (name: string) => ({
    title: 'Agente Creado',
    message: `El agente "${name}" ha sido creado exitosamente`,
    type: 'success' as const
  }),
  AGENT_UPDATED: (name: string) => ({
    title: 'Agente Actualizado',
    message: `El agente "${name}" ha sido actualizado`,
    type: 'success' as const
  }),
  AGENT_DELETED: (name: string) => ({
    title: 'Agente Eliminado',
    message: `El agente "${name}" ha sido eliminado`,
    type: 'info' as const
  }),
  AGENT_ERROR: (name: string) => ({
    title: 'Error en Agente',
    message: `Error al procesar el agente "${name}"`,
    type: 'error' as const
  }),

  // Client notifications
  CLIENT_CREATED: (name: string) => ({
    title: 'Cliente Agregado',
    message: `El cliente "${name}" ha sido agregado exitosamente`,
    type: 'success' as const
  }),
  CLIENT_UPDATED: (name: string) => ({
    title: 'Cliente Actualizado',
    message: `El cliente "${name}" ha sido actualizado`,
    type: 'success' as const
  }),
  CLIENT_DELETED: (name: string) => ({
    title: 'Cliente Eliminado',
    message: `El cliente "${name}" ha sido eliminado`,
    type: 'info' as const
  }),

  // Project notifications
  PROJECT_CREATED: (name: string) => ({
    title: 'Proyecto Creado',
    message: `El proyecto "${name}" ha sido creado exitosamente`,
    type: 'success' as const
  }),
  PROJECT_UPDATED: (name: string) => ({
    title: 'Proyecto Actualizado',
    message: `El proyecto "${name}" ha sido actualizado`,
    type: 'success' as const
  }),
  PROJECT_COMPLETED: (name: string) => ({
    title: 'Proyecto Completado',
    message: `El proyecto "${name}" ha sido completado exitosamente`,
    type: 'success' as const
  }),

  // System notifications
  SYSTEM_ERROR: (message: string) => ({
    title: 'Error del Sistema',
    message,
    type: 'error' as const
  }),
  NETWORK_ERROR: () => ({
    title: 'Error de Conexión',
    message: 'No se pudo conectar con el servidor. Verifica tu conexión.',
    type: 'error' as const
  }),
  SAVE_SUCCESS: () => ({
    title: 'Guardado Exitoso',
    message: 'Los cambios han sido guardados correctamente',
    type: 'success' as const
  }),
  DELETE_CONFIRMATION: (item: string) => ({
    title: 'Confirmación Requerida',
    message: `¿Estás seguro de que quieres eliminar "${item}"?`,
    type: 'warning' as const
  })
};
