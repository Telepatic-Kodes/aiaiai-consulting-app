'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, Send, Edit3, Trash2, Reply, MoreVertical, User, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  timestamp: Date;
  editedAt?: Date;
  replies: Comment[];
  likes: number;
  dislikes: number;
  userLiked?: boolean;
  userDisliked?: boolean;
  isResolved?: boolean;
  mentions?: string[];
  attachments?: CommentAttachment[];
}

export interface CommentAttachment {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'link';
  size?: number;
}

interface CommentsSystemProps {
  resourceId: string;
  resourceType: 'project' | 'client' | 'report' | 'document';
  className?: string;
}

const CommentsSystem: React.FC<CommentsSystemProps> = ({ 
  resourceId, 
  resourceType, 
  className 
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [showResolved, setShowResolved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Mock data inicial
  const mockComments: Comment[] = [
    {
      id: '1',
      content: 'Excelente trabajo en la estrategia digital. Sugiero agregar más métricas de engagement.',
      author: {
        id: 'user1',
        name: 'María González',
        avatar: '👩‍💼',
        role: 'Directora de Estrategia'
      },
      timestamp: new Date('2024-01-15T10:30:00'),
      replies: [
        {
          id: '1-1',
          content: 'Totalmente de acuerdo. Podemos implementar Google Analytics 4.',
          author: {
            id: 'user2',
            name: 'Carlos Ruiz',
            avatar: '👨‍💻',
            role: 'Analista de Datos'
          },
          timestamp: new Date('2024-01-15T11:15:00'),
          replies: [],
          likes: 3,
          dislikes: 0,
          userLiked: true
        }
      ],
      likes: 5,
      dislikes: 0,
      userLiked: false,
      mentions: ['@carlos.ruiz'],
      attachments: [
        {
          id: 'att1',
          name: 'analytics-report.pdf',
          url: '/attachments/analytics-report.pdf',
          type: 'document',
          size: 1024000
        }
      ]
    },
    {
      id: '2',
      content: '¿Cuándo estimamos tener el prototipo listo? Necesitamos coordinar con el equipo de desarrollo.',
      author: {
        id: 'user3',
        name: 'Ana Martínez',
        avatar: '👩‍🔬',
        role: 'Product Manager'
      },
      timestamp: new Date('2024-01-15T14:20:00'),
      replies: [],
      likes: 2,
      dislikes: 0,
      isResolved: true
    }
  ];

  useEffect(() => {
    // Cargar comentarios desde localStorage
    const saved = localStorage.getItem(`comments-${resourceId}`);
    if (saved) {
      setComments(JSON.parse(saved));
    } else {
      setComments(mockComments);
    }
  }, [resourceId]);

  const saveComments = useCallback((newComments: Comment[]) => {
    setComments(newComments);
    localStorage.setItem(`comments-${resourceId}`, JSON.stringify(newComments));
  }, [resourceId]);

  const addComment = useCallback(async (content: string, parentId?: string) => {
    if (!content.trim()) return;

    setIsLoading(true);
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      content: content.trim(),
      author: {
        id: 'current-user',
        name: 'Usuario Actual',
        avatar: '👤',
        role: 'Consultor'
      },
      timestamp: new Date(),
      replies: [],
      likes: 0,
      dislikes: 0
    };

    if (parentId) {
      // Agregar como respuesta
      const newComments = comments.map(c => 
        c.id === parentId 
          ? { ...c, replies: [...c.replies, comment] }
          : c
      );
      saveComments(newComments);
    } else {
      // Agregar como comentario principal
      saveComments([comment, ...comments]);
    }

    setNewComment('');
    setReplyingTo(null);
    setIsLoading(false);
  }, [comments, saveComments]);

  const editComment = useCallback(async (commentId: string, content: string) => {
    if (!content.trim()) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    const updateComment = (comment: Comment): Comment => {
      if (comment.id === commentId) {
        return { ...comment, content: content.trim(), editedAt: new Date() };
      }
      return {
        ...comment,
        replies: comment.replies.map(updateComment)
      };
    };

    saveComments(comments.map(updateComment));
    setEditingComment(null);
    setIsLoading(false);
  }, [comments, saveComments]);

  const deleteComment = useCallback(async (commentId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este comentario?')) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    const deleteCommentRecursive = (comment: Comment): Comment | null => {
      if (comment.id === commentId) return null;
      return {
        ...comment,
        replies: comment.replies.map(deleteCommentRecursive).filter(Boolean) as Comment[]
      };
    };

    saveComments(comments.map(deleteCommentRecursive).filter(Boolean) as Comment[]);
    setIsLoading(false);
  }, [comments, saveComments]);

  const toggleLike = useCallback(async (commentId: string) => {
    const updateComment = (comment: Comment): Comment => {
      if (comment.id === commentId) {
        const newLiked = !comment.userLiked;
        const newDisliked = comment.userDisliked ? false : comment.userDisliked;
        return {
          ...comment,
          userLiked: newLiked,
          userDisliked: newDisliked,
          likes: comment.likes + (newLiked ? 1 : -1),
          dislikes: comment.dislikes + (newDisliked ? -1 : 0)
        };
      }
      return {
        ...comment,
        replies: comment.replies.map(updateComment)
      };
    };

    saveComments(comments.map(updateComment));
  }, [comments, saveComments]);

  const toggleDislike = useCallback(async (commentId: string) => {
    const updateComment = (comment: Comment): Comment => {
      if (comment.id === commentId) {
        const newDisliked = !comment.userDisliked;
        const newLiked = comment.userLiked ? false : comment.userLiked;
        return {
          ...comment,
          userLiked: newLiked,
          userDisliked: newDisliked,
          likes: comment.likes + (newLiked ? -1 : 0),
          dislikes: comment.dislikes + (newDisliked ? 1 : -1)
        };
      }
      return {
        ...comment,
        replies: comment.replies.map(updateComment)
      };
    };

    saveComments(comments.map(updateComment));
  }, [comments, saveComments]);

  const toggleResolved = useCallback(async (commentId: string) => {
    const updateComment = (comment: Comment): Comment => {
      if (comment.id === commentId) {
        return { ...comment, isResolved: !comment.isResolved };
      }
      return {
        ...comment,
        replies: comment.replies.map(updateComment)
      };
    };

    saveComments(comments.map(updateComment));
  }, [comments, saveComments]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `Hace ${minutes}m`;
    if (minutes < 1440) return `Hace ${Math.floor(minutes / 60)}h`;
    return date.toLocaleDateString();
  };

  const filteredComments = showResolved 
    ? comments 
    : comments.filter(c => !c.isResolved);

  const renderComment = (comment: Comment, isReply = false) => (
    <div
      key={comment.id}
      className={cn(
        'border border-gray-200 rounded-lg p-4',
        isReply && 'ml-8 border-l-2 border-l-blue-200',
        comment.isResolved && 'bg-green-50 border-green-200'
      )}
    >
      {/* Comment Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{comment.author.avatar}</div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-gray-900">{comment.author.name}</h4>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {comment.author.role}
              </span>
              {comment.isResolved && (
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                  Resuelto
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{formatTime(comment.timestamp)}</span>
              {comment.editedAt && (
                <span>(editado {formatTime(comment.editedAt)})</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleResolved(comment.id)}
            className={cn(
              'text-xs px-2 py-1 rounded',
              comment.isResolved
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {comment.isResolved ? 'Resuelto' : 'Marcar como resuelto'}
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Comment Content */}
      <div className="mb-3">
        {editingComment === comment.id ? (
          <div className="space-y-3">
            <textarea
              ref={textareaRef}
              defaultValue={comment.content}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  const content = textareaRef.current?.value || '';
                  editComment(comment.id, content);
                }}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditingComment(null)}
                className="px-3 py-1 text-gray-600 text-sm hover:text-gray-800"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
        )}
      </div>

      {/* Attachments */}
      {comment.attachments && comment.attachments.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-2">
            {comment.attachments.map(attachment => (
              <a
                key={attachment.id}
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
              >
                <span>📎</span>
                <span>{attachment.name}</span>
                {attachment.size && (
                  <span className="text-xs text-gray-500">
                    ({(attachment.size / 1024).toFixed(1)} KB)
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Comment Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => toggleLike(comment.id)}
            className={cn(
              'flex items-center space-x-1 text-sm',
              comment.userLiked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
            )}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{comment.likes}</span>
          </button>
          
          <button
            onClick={() => toggleDislike(comment.id)}
            className={cn(
              'flex items-center space-x-1 text-sm',
              comment.userDisliked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
            )}
          >
            <ThumbsDown className="w-4 h-4" />
            <span>{comment.dislikes}</span>
          </button>

          <button
            onClick={() => setReplyingTo(comment.id)}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <Reply className="w-4 h-4" />
            <span>Responder</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setEditingComment(comment.id)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Edit3 className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={() => deleteComment(comment.id)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Trash2 className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Replies */}
      {comment.replies.length > 0 && (
        <div className="mt-4 space-y-3">
          {comment.replies.map(reply => renderComment(reply, true))}
        </div>
      )}

      {/* Reply Form */}
      {replyingTo === comment.id && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <textarea
            placeholder="Escribe tu respuesta..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            rows={3}
          />
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                const content = (document.querySelector('textarea') as HTMLTextAreaElement)?.value || '';
                addComment(content, comment.id);
              }}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Responder
            </button>
            <button
              onClick={() => setReplyingTo(null)}
              className="px-3 py-1 text-gray-600 text-sm hover:text-gray-800"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-6 h-6 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Comentarios ({filteredComments.length})
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={showResolved}
              onChange={(e) => setShowResolved(e.target.checked)}
              className="rounded"
            />
            <span>Mostrar resueltos</span>
          </label>
        </div>
      </div>

      {/* New Comment Form */}
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">👤</div>
          <div className="flex-1">
            <textarea
              placeholder="Escribe un comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <div className="flex items-center justify-between mt-3">
              <div className="text-xs text-gray-500">
                Presiona Ctrl+Enter para enviar
              </div>
              <button
                onClick={() => addComment(newComment)}
                disabled={!newComment.trim() || isLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>Comentar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No hay comentarios aún</p>
            <p className="text-sm">Sé el primero en comentar</p>
          </div>
        ) : (
          filteredComments.map(comment => renderComment(comment))
        )}
      </div>
    </div>
  );
};

export default CommentsSystem;
