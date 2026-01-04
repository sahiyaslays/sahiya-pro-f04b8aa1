import React, { useState, useEffect } from 'react';
import { History, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEditMode } from '@/contexts/EditModeContext';

// Wrapper component for SSR safety
export const HistoryPanel: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render during SSR
  if (!mounted) {
    return null;
  }

  return <HistoryPanelContent />;
};

// Inner component that safely uses hooks after mount
const HistoryPanelContent: React.FC = () => {
  const { showHistory, toggleHistory, history, restoreFromHistory } = useEditMode();

  if (!showHistory) return null;

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-background border rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5" />
            <h3 className="font-semibold">Edit History</h3>
          </div>
          <Button
            onClick={toggleHistory}
            size="icon"
            variant="ghost"
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* History List */}
        <div className="overflow-y-auto max-h-[60vh]">
          {history.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No changes yet</p>
              <p className="text-sm">Start editing to see your change history</p>
            </div>
          ) : (
            <div className="p-2">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-3 mb-2 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm mb-1">
                        {item.description}
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">
                        {formatTimestamp(item.timestamp)}
                      </div>
                      <div className="text-xs space-y-1">
                        {(() => {
                          const stateToShow = item.fullState || (item as any).changes || {};
                          
                          if (!stateToShow || typeof stateToShow !== 'object') {
                            return <div className="text-xs text-muted-foreground">No data available</div>;
                          }
                          
                          const entries = Object.entries(stateToShow);
                          
                          return entries.slice(0, 3).map(([key, value]) => (
                            <div key={key} className="truncate">
                              <span className="font-medium">{key}:</span>{' '}
                              <span className="text-muted-foreground">
                                "{typeof value === 'string' && value.length > 30 ? value.substring(0, 30) + '...' : String(value || '')}"
                              </span>
                            </div>
                          ));
                        })()}
                        {(() => {
                          const stateToShow = item.fullState || (item as any).changes || {};
                          
                          if (!stateToShow || typeof stateToShow !== 'object') {
                            return null;
                          }
                          
                          const totalItems = Object.keys(stateToShow).length;
                          if (totalItems > 3) {
                            return (
                              <div className="text-xs text-muted-foreground">
                                ...and {totalItems - 3} more items
                              </div>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    </div>
                    <Button
                      onClick={() => restoreFromHistory(item)}
                      size="sm"
                      variant="outline"
                      className="shrink-0"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Restore
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
