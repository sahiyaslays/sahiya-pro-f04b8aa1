import { useState, useEffect } from 'react';
import { Variant } from '@/types/shop';
import { useEditMode } from '@/contexts/EditModeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { formatPrice } from '@/data/shopData';

interface EditableVariantsProps {
  productId: string;
  variants: Variant[];
  onVariantChange?: (variants: Variant[]) => void;
}

export const EditableVariants = ({ productId, variants, onVariantChange }: EditableVariantsProps) => {
  const { isEditMode } = useEditMode();
  const [localVariants, setLocalVariants] = useState<Variant[]>(variants);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    // Load from localStorage if available
    const stored = localStorage.getItem(`variants-${productId}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setLocalVariants(parsed);
      } catch (e) {
        console.error('Failed to parse stored variants', e);
      }
    }
  }, [productId]);

  const saveVariants = (newVariants: Variant[]) => {
    setLocalVariants(newVariants);
    localStorage.setItem(`variants-${productId}`, JSON.stringify(newVariants));
    onVariantChange?.(newVariants);
  };

  const addVariant = () => {
    const newVariant: Variant = {
      length: 'New Size',
      price: 0,
      in_stock: true,
    };
    saveVariants([...localVariants, newVariant]);
  };

  const deleteVariant = (index: number) => {
    const newVariants = localVariants.filter((_, i) => i !== index);
    saveVariants(newVariants);
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const updateVariant = (index: number, updates: Partial<Variant>) => {
    const newVariants = localVariants.map((v, i) => 
      i === index ? { ...v, ...updates } : v
    );
    saveVariants(newVariants);
  };

  if (!isEditMode) {
    return null;
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Edit2 className="h-4 w-4" />
          Edit Variants
        </h3>
        <Button onClick={addVariant} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-1" />
          Add Variant
        </Button>
      </div>

      <div className="space-y-2">
        {localVariants.map((variant, index) => (
          <div key={index} className="flex items-center gap-2 p-2 bg-background rounded border">
            {editingIndex === index ? (
              <>
                <Input
                  value={variant.length}
                  onChange={(e) => updateVariant(index, { length: e.target.value })}
                  placeholder="Size/Length"
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={variant.price}
                  onChange={(e) => updateVariant(index, { price: parseFloat(e.target.value) || 0 })}
                  placeholder="Price"
                  className="w-24"
                />
                <Button 
                  onClick={() => setEditingIndex(null)} 
                  size="sm"
                  variant="ghost"
                >
                  Done
                </Button>
              </>
            ) : (
              <>
                <span className="flex-1">{variant.length} - {formatPrice(variant.price)}</span>
                <Button 
                  onClick={() => setEditingIndex(index)} 
                  size="sm"
                  variant="ghost"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button 
              onClick={() => deleteVariant(index)} 
              size="sm"
              variant="ghost"
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
