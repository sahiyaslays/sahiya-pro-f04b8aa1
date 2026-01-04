import React, { useState, useEffect } from 'react';
import { Edit3, Save, X, History, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEditMode } from '@/contexts/EditModeContext';
import { HistoryPanel } from '@/components/HistoryPanel';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

// Wrapper component that handles SSR safety
export const EditModeButton: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render during SSR
  if (!mounted) {
    return null;
  }

  return <EditModeButtonContent />;
};

// Inner component that safely uses hooks after mount
const EditModeButtonContent: React.FC = () => {
  const { isEditMode, toggleEditMode, saveChanges, hasChanges, toggleHistory, showHistory, highlightMode, toggleHighlightMode } = useEditMode();
  const { user } = useAuth();
  
  // Only show for admin user
  if (!user || user.email !== 'sahiyaslays@gmail.com') {
    return null;
  }

  return (
    <>
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

        {/* Highlight Mode Button */}
        <Button
          onClick={toggleHighlightMode}
          size="icon"
          variant={highlightMode ? "default" : "outline"}
          className={cn(
            "h-10 w-10 rounded-full shadow-lg transition-all duration-300",
            highlightMode 
              ? "bg-primary hover:bg-primary/90" 
              : "bg-background hover:bg-accent"
          )}
        >
          {highlightMode ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </Button>

        {/* History Button */}
        <Button
          onClick={toggleHistory}
          size="icon"
          variant="outline"
          className="h-10 w-10 rounded-full shadow-lg bg-background hover:bg-accent transition-all duration-300"
        >
          <History className="h-4 w-4" />
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

      {/* History Panel */}
      <HistoryPanel />
    </>
  );
};
