import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  editedContent: Record<string, string>;
  updateContent: (id: string, content: string) => void;
  saveChanges: () => void;
  hasChanges: boolean;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (!context) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
};

interface EditModeProviderProps {
  children: ReactNode;
}

export const EditModeProvider: React.FC<EditModeProviderProps> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      // Reset changes when exiting edit mode without saving
      setEditedContent({});
      setHasChanges(false);
    }
  };

  const updateContent = (id: string, content: string) => {
    setEditedContent(prev => ({
      ...prev,
      [id]: content
    }));
    setHasChanges(true);
  };

  const saveChanges = () => {
    // Apply changes to the actual DOM elements
    Object.entries(editedContent).forEach(([id, content]) => {
      const element = document.querySelector(`[data-edit-id="${id}"]`);
      if (element) {
        element.textContent = content;
      }
    });
    
    setEditedContent({});
    setHasChanges(false);
    setIsEditMode(false);
  };

  return (
    <EditModeContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
        editedContent,
        updateContent,
        saveChanges,
        hasChanges,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
};