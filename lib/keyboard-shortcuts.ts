/**
 * Keyboard Shortcuts System
 * 
 * Features:
 * - Global keyboard shortcuts
 * - Context-aware shortcuts
 * - Customizable key combinations
 * - Visual feedback
 * - Professional shortcuts for productivity
 */

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  description: string;
  action: () => void;
  context?: string;
}

class KeyboardShortcutManager {
  private shortcuts: Map<string, KeyboardShortcut> = new Map();
  private isEnabled = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.setupGlobalListener();
    }
  }

  private setupGlobalListener() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (!this.isEnabled) return;

    const key = e.key.toLowerCase();
    const ctrl = e.ctrlKey;
    const shift = e.shiftKey;
    const alt = e.altKey;
    const meta = e.metaKey;

    // Skip if user is typing in an input field
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
      return;
    }

    const shortcutKey = this.getShortcutKey(key, ctrl, shift, alt, meta);
    const shortcut = this.shortcuts.get(shortcutKey);

    if (shortcut) {
      e.preventDefault();
      shortcut.action();
    }
  }

  private getShortcutKey(key: string, ctrl: boolean, shift: boolean, alt: boolean, meta: boolean): string {
    const modifiers = [];
    if (ctrl) modifiers.push('ctrl');
    if (shift) modifiers.push('shift');
    if (alt) modifiers.push('alt');
    if (meta) modifiers.push('meta');
    
    return modifiers.length > 0 ? `${modifiers.join('+')}+${key}` : key;
  }

  register(shortcut: KeyboardShortcut) {
    const key = this.getShortcutKey(
      shortcut.key,
      shortcut.ctrl || false,
      shortcut.shift || false,
      shortcut.alt || false,
      shortcut.meta || false
    );
    
    this.shortcuts.set(key, shortcut);
  }

  unregister(key: string) {
    this.shortcuts.delete(key);
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }

  getShortcuts(): KeyboardShortcut[] {
    return Array.from(this.shortcuts.values());
  }

  getShortcutsByContext(context: string): KeyboardShortcut[] {
    return this.getShortcuts().filter(shortcut => shortcut.context === context);
  }
}

export const keyboardShortcuts = new KeyboardShortcutManager();

// Predefined shortcuts for AIAIAI Consulting
export const AIAIAI_SHORTCUTS: KeyboardShortcut[] = [
  // Navigation shortcuts
  {
    key: 'k',
    ctrl: true,
    description: 'Buscar',
    action: () => {
      const searchInput = document.querySelector('input[placeholder*="Buscar"]') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    },
    context: 'global'
  },
  {
    key: '1',
    ctrl: true,
    description: 'Ir al Dashboard',
    action: () => {
      window.location.href = '/dashboard';
    },
    context: 'global'
  },
  {
    key: '2',
    ctrl: true,
    description: 'Ir a Agentes',
    action: () => {
      window.location.href = '/agents';
    },
    context: 'global'
  },
  {
    key: '3',
    ctrl: true,
    description: 'Ir a Clientes',
    action: () => {
      window.location.href = '/clients';
    },
    context: 'global'
  },
  {
    key: '4',
    ctrl: true,
    description: 'Ir a Proyectos',
    action: () => {
      window.location.href = '/projects';
    },
    context: 'global'
  },
  {
    key: '5',
    ctrl: true,
    description: 'Ir a Reportes',
    action: () => {
      window.location.href = '/reports';
    },
    context: 'global'
  },

  // Action shortcuts
  {
    key: 'n',
    ctrl: true,
    description: 'Nuevo elemento',
    action: () => {
      const newButton = document.querySelector('button:contains("Nuevo"), button:contains("Agregar"), button:contains("Crear")') as HTMLButtonElement;
      if (newButton) {
        newButton.click();
      }
    },
    context: 'global'
  },
  {
    key: 'e',
    ctrl: true,
    description: 'Exportar datos',
    action: () => {
      const exportButton = document.querySelector('button:contains("Exportar")') as HTMLButtonElement;
      if (exportButton) {
        exportButton.click();
      }
    },
    context: 'global'
  },
  {
    key: 'f',
    ctrl: true,
    description: 'Abrir filtros',
    action: () => {
      const filterButton = document.querySelector('button:contains("Filtros")') as HTMLButtonElement;
      if (filterButton) {
        filterButton.click();
      }
    },
    context: 'global'
  },

  // Chat shortcuts
  {
    key: 'c',
    ctrl: true,
    description: 'Abrir chat',
    action: () => {
      const chatButton = document.querySelector('[data-chat-toggle]') as HTMLButtonElement;
      if (chatButton) {
        chatButton.click();
      }
    },
    context: 'global'
  },

  // Theme shortcuts
  {
    key: 't',
    ctrl: true,
    shift: true,
    description: 'Cambiar tema',
    action: () => {
      const themeButton = document.querySelector('[data-theme-toggle]') as HTMLButtonElement;
      if (themeButton) {
        themeButton.click();
      }
    },
    context: 'global'
  },

  // Help shortcuts
  {
    key: '?',
    description: 'Mostrar shortcuts',
    action: () => {
      // This will be handled by the ShortcutsModal component
      const event = new CustomEvent('show-shortcuts');
      window.dispatchEvent(event);
    },
    context: 'global'
  },

  // Escape shortcuts
  {
    key: 'Escape',
    description: 'Cerrar modales/paneles',
    action: () => {
      // Close any open modals or panels
      const modals = document.querySelectorAll('[data-modal]');
      modals.forEach(modal => {
        const closeButton = modal.querySelector('[data-modal-close]') as HTMLButtonElement;
        if (closeButton) {
          closeButton.click();
        }
      });
    },
    context: 'global'
  }
];

// Register default shortcuts
AIAIAI_SHORTCUTS.forEach(shortcut => {
  keyboardShortcuts.register(shortcut);
});

// Utility function to format shortcut display
export function formatShortcut(shortcut: KeyboardShortcut): string {
  const parts = [];
  
  if (shortcut.ctrl) parts.push('Ctrl');
  if (shortcut.shift) parts.push('Shift');
  if (shortcut.alt) parts.push('Alt');
  if (shortcut.meta) parts.push('Cmd');
  
  parts.push(shortcut.key.toUpperCase());
  
  return parts.join(' + ');
}

// Hook for using shortcuts in React components
export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  React.useEffect(() => {
    shortcuts.forEach(shortcut => {
      keyboardShortcuts.register(shortcut);
    });

    return () => {
      shortcuts.forEach(shortcut => {
        const key = keyboardShortcuts.getShortcutKey(
          shortcut.key,
          shortcut.ctrl || false,
          shortcut.shift || false,
          shortcut.alt || false,
          shortcut.meta || false
        );
        keyboardShortcuts.unregister(key);
      });
    };
  }, [shortcuts]);
}
