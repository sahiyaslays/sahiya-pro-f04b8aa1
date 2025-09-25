import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ChangeHistory {
  id: string;
  timestamp: number;
  fullState: Record<string, string>; // Store complete state instead of just changes
  description: string;
}

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  editedContent: Record<string, string>;
  updateContent: (id: string, content: string) => void;
  saveChanges: () => void;
  hasChanges: boolean;
  history: ChangeHistory[];
  restoreFromHistory: (historyItem: ChangeHistory) => void;
  showHistory: boolean;
  toggleHistory: () => void;
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
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<ChangeHistory[]>([]);
  const [persistedContent, setPersistedContent] = useState<Record<string, string>>({});

  // Load persisted content and history on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('editableContent');
    const savedHistory = localStorage.getItem('editHistory');
    
    if (savedContent) {
      const content = JSON.parse(savedContent) as Record<string, string>;
      setPersistedContent(content);
      
      // Apply saved content to DOM
      Object.entries(content).forEach(([id, content]) => {
        const element = document.querySelector(`[data-edit-id="${id}"]`);
        if (element) {
          element.textContent = content;
        }
      });
    }
    
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory) as ChangeHistory[]);
    }
  }, []);

  // Apply persisted content when DOM updates
  useEffect(() => {
    Object.entries(persistedContent).forEach(([id, content]) => {
      const element = document.querySelector(`[data-edit-id="${id}"]`);
      if (element && element.textContent !== content) {
        element.textContent = content;
      }
    });
  });

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      // Reset changes when exiting edit mode without saving
      setEditedContent({});
      setHasChanges(false);
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const updateContent = (id: string, content: string) => {
    setEditedContent(prev => ({
      ...prev,
      [id]: content
    }));
    setHasChanges(true);
  };

  const saveChanges = () => {
    if (!hasChanges) return;

    const timestamp = Date.now();
    const changes = { ...editedContent };
    
    // Calculate new complete state
    const newCompleteState = { ...persistedContent, ...changes };
    
    // Create history entry with full state
    const historyEntry: ChangeHistory = {
      id: `change-${timestamp}`,
      timestamp,
      fullState: { ...newCompleteState }, // Store complete state at this point
      description: `Updated ${Object.keys(changes).length} item(s)`
    };

    // Update history
    const newHistory = [historyEntry, ...history].slice(0, 50); // Keep last 50 changes
    setHistory(newHistory);
    localStorage.setItem('editHistory', JSON.stringify(newHistory));

    // Apply changes to DOM and save to localStorage
    Object.entries(changes).forEach(([id, content]) => {
      const element = document.querySelector(`[data-edit-id="${id}"]`);
      if (element) {
        element.textContent = content;
      }
    });
    
    setPersistedContent(newCompleteState);
    localStorage.setItem('editableContent', JSON.stringify(newCompleteState));
    
    setEditedContent({});
    setHasChanges(false);
    setIsEditMode(false);
  };

  const restoreFromHistory = (historyItem: ChangeHistory) => {
    // Restore to the complete state at that point in time
    const stateToRestore = historyItem.fullState;
    
    // Clear all current content from DOM first
    const allEditableElements = document.querySelectorAll('[data-edit-id]');
    allEditableElements.forEach(element => {
      const id = element.getAttribute('data-edit-id');
      if (id && !stateToRestore[id]) {
        // If this element doesn't exist in the restored state, clear it
        element.textContent = element.getAttribute('data-original-content') || '';
      }
    });
    
    // Apply the restored state to DOM
    Object.entries(stateToRestore).forEach(([id, content]) => {
      const element = document.querySelector(`[data-edit-id="${id}"]`);
      if (element) {
        element.textContent = content;
      }
    });

    // Update persisted content to match the restored state
    setPersistedContent(stateToRestore);
    localStorage.setItem('editableContent', JSON.stringify(stateToRestore));
    
    setShowHistory(false);
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
        history,
        restoreFromHistory,
        showHistory,
        toggleHistory,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
};