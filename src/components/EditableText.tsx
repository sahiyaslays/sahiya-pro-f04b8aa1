import React, { useState, useEffect, useRef } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { cn } from '@/lib/utils';

interface EditableTextProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const EditableText: React.FC<EditableTextProps> = ({ 
  children, 
  id, 
  className,
  as: Component = 'span'
}) => {
  const { isEditMode, editedContent, updateContent, highlightMode } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState('');
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // SSR-safe: mark as mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get current content from edited state, localStorage, or original children
  const getInitialContent = () => {
    if (editedContent[id]) return editedContent[id];
    
    // Only check localStorage on client side
    if (typeof window !== 'undefined') {
      const savedContent = localStorage.getItem('editableContent');
      if (savedContent) {
        const parsed = JSON.parse(savedContent);
        if (parsed[id]) return parsed[id];
      }
    }
    
    return typeof children === 'string' ? children : '';
  };

  // During SSR, always use children; on client, use getInitialContent
  const childrenString = typeof children === 'string' ? children : '';
  const currentContent = mounted ? getInitialContent() : childrenString;
  const isMultiline = currentContent.length > 50 || currentContent.includes('\n');

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (isEditMode && !isEditing) {
      setIsEditing(true);
      setTempContent(currentContent);
    }
  };

  const handleSave = () => {
    updateContent(id, tempContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempContent(currentContent);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isMultiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditMode && isEditing) {
    return (
      <div className="relative inline-block w-full">
        {isMultiline ? (
          <textarea
            ref={textareaRef}
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={cn(
              "w-full min-h-[60px] p-2 border-2 border-primary bg-background text-foreground rounded resize-y",
              className
            )}
            rows={3}
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={cn(
              "w-full p-1 border-2 border-primary bg-background text-foreground rounded",
              className
            )}
          />
        )}
      </div>
    );
  }

  return (
    <Component
      data-edit-id={id}
      className={cn(
        className,
        isEditMode && "cursor-pointer hover:bg-primary/10 hover:outline hover:outline-2 hover:outline-primary/30 rounded transition-all duration-200",
        highlightMode && !isEditMode && "outline outline-2 outline-primary/50 bg-primary/5 rounded animate-pulse shadow-lg shadow-primary/20"
      )}
      onClick={handleClick}
    >
      {currentContent || children}
    </Component>
  );
};