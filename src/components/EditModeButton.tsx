import React from 'react';
import { Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEditMode } from '@/contexts/EditModeContext';
import { cn } from '@/lib/utils';

export const EditModeButton: React.FC = () => {
  const { isEditMode, toggleEditMode, saveChanges, hasChanges } = useEditMode();

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2">
      {/* Main Edit/Cancel Button */}
      <Button
        onClick={toggleEditMode}
        size="icon"
        variant={isEditMode ? "destructive" : "default"}
        className={cn(
          "h-12 w-12 rounded-full shadow-lg transition-all duration-300",
          isEditMode 
            ? "bg-destructive hover:bg-destructive/90" 
            : "bg-primary hover:bg-primary/90"
        )}
      >
        {isEditMode ? (
          <X className="h-5 w-5" />
        ) : (
          <Edit3 className="h-5 w-5" />
        )}
      </Button>

      {/* Save Button - only shown when in edit mode with changes */}
      {isEditMode && hasChanges && (
        <Button
          onClick={saveChanges}
          size="icon"
          variant="default"
          className="h-12 w-12 rounded-full shadow-lg bg-green-600 hover:bg-green-700 transition-all duration-300 animate-in slide-in-from-left-2"
        >
          <Save className="h-5 w-5" />
        </Button>
      )}

      {/* Helper text */}
      {isEditMode && (
        <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-3 shadow-lg max-w-[200px] text-xs text-muted-foreground animate-in slide-in-from-left-2">
          <p className="font-medium mb-1">Edit Mode Active</p>
          <p>Click on any text to edit it. Press Enter to save or Esc to cancel.</p>
        </div>
      )}
    </div>
  );
};