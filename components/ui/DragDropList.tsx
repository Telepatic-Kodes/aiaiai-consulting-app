import React from 'react';
import { cn } from '@/lib/utils';
import { GripVertical, Plus, Trash2 } from 'lucide-react';

interface DragDropItem {
  id: string;
  content: React.ReactNode;
  data?: any;
}

interface DragDropListProps {
  items: DragDropItem[];
  onReorder: (items: DragDropItem[]) => void;
  onAdd?: () => void;
  onDelete?: (id: string) => void;
  className?: string;
  title?: string;
  emptyMessage?: string;
}

/**
 * Drag and Drop List Component
 * 
 * Features:
 * - Drag and drop reordering
 * - Add/delete items
 * - Visual feedback
 * - Keyboard navigation
 * - Professional styling
 */
export function DragDropList({
  items,
  onReorder,
  onAdd,
  onDelete,
  className,
  title,
  emptyMessage = "No hay elementos para mostrar"
}: DragDropListProps) {
  const [draggedItem, setDraggedItem] = React.useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = React.useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', itemId);
  };

  const handleDragOver = (e: React.DragEvent, itemId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItem(itemId);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetId) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const draggedIndex = items.findIndex(item => item.id === draggedItem);
    const targetIndex = items.findIndex(item => item.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newItems = [...items];
    const [draggedItemData] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItemData);

    onReorder(newItems);
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, itemId: string) => {
    if (e.key === 'Delete' && onDelete) {
      onDelete(itemId);
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {title && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Agregar</span>
            </button>
          )}
        </div>
      )}

      <div className="space-y-2">
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>{emptyMessage}</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
              onDragOver={(e) => handleDragOver(e, item.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, item.id)}
              onDragEnd={handleDragEnd}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              tabIndex={0}
              className={cn(
                'flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg cursor-move transition-all duration-200',
                'hover:shadow-md hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
                draggedItem === item.id && 'opacity-50 transform rotate-2',
                dragOverItem === item.id && 'border-primary-500 bg-primary-50',
                'group'
              )}
            >
              {/* Drag Handle */}
              <div className="flex-shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors">
                <GripVertical className="h-5 w-5" />
              </div>

              {/* Item Number */}
              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                {index + 1}
              </div>

              {/* Item Content */}
              <div className="flex-1 min-w-0">
                {item.content}
              </div>

              {/* Delete Button */}
              {onDelete && (
                <button
                  onClick={() => onDelete(item.id)}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Eliminar elemento"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Drop Zone for adding new items */}
      {onAdd && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
          }}
          onDrop={(e) => {
            e.preventDefault();
            onAdd();
          }}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 hover:bg-primary-50 transition-colors cursor-pointer"
        >
          <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">
            Arrastra aquí para agregar un nuevo elemento
          </p>
        </div>
      )}
    </div>
  );
}
