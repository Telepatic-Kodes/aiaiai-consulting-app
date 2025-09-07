import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from './Button';
import { themeManager, Theme } from '@/lib/theme';

/**
 * Theme Toggle Component
 * 
 * Features:
 * - Light/Dark/System mode toggle
 * - Smooth transitions
 * - Professional icons
 * - Accessibility compliant
 */
export function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>(themeManager.getTheme());

  React.useEffect(() => {
    const unsubscribe = themeManager.subscribe(setTheme);
    return unsubscribe;
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    themeManager.setTheme(newTheme);
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'system':
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Modo Claro';
      case 'dark':
        return 'Modo Oscuro';
      case 'system':
        return 'Sistema';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const themes: Theme[] = ['light', 'dark', 'system'];
          const currentIndex = themes.indexOf(theme);
          const nextIndex = (currentIndex + 1) % themes.length;
          handleThemeChange(themes[nextIndex]);
        }}
        className="flex items-center space-x-2"
        title={`Cambiar tema - Actual: ${getLabel()}`}
      >
        {getIcon()}
        <span className="hidden sm:inline">{getLabel()}</span>
      </Button>
    </div>
  );
}
