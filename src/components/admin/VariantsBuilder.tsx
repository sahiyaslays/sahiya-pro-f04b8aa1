import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, GripVertical } from 'lucide-react';

export interface ProductVariant {
  length: string;
  price: number;
  sale_price?: number;
  in_stock: boolean;
  sku?: string;
}

interface VariantsBuilderProps {
  variants: ProductVariant[];
  onVariantsChange: (variants: ProductVariant[]) => void;
}

export function VariantsBuilder({ variants, onVariantsChange }: VariantsBuilderProps) {
  const addVariant = () => {
    onVariantsChange([
      ...variants,
      { length: '', price: 0, in_stock: true },
    ]);
  };

  const removeVariant = (index: number) => {
    onVariantsChange(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index: number, field: keyof ProductVariant, value: any) => {
    const updated = variants.map((v, i) => {
      if (i !== index) return v;
      return { ...v, [field]: value };
    });
    onVariantsChange(updated);
  };

  const moveVariant = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= variants.length) return;
    const newVariants = [...variants];
    const [removed] = newVariants.splice(fromIndex, 1);
    newVariants.splice(toIndex, 0, removed);
    onVariantsChange(newVariants);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-gray-700 font-medium">Product Variants</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addVariant}
          className="gap-1 border-gray-300"
        >
          <Plus className="h-4 w-4" />
          Add Variant
        </Button>
      </div>

      {variants.length === 0 ? (
        <div className="text-sm text-gray-500 text-center py-4 border border-dashed border-gray-300 rounded-lg">
          No variants added. Click "Add Variant" to create one.
        </div>
      ) : (
        <div className="space-y-3">
          {variants.map((variant, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    Variant {index + 1}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => moveVariant(index, index - 1)}
                      className="h-8 w-8 p-0"
                    >
                      ↑
                    </Button>
                  )}
                  {index < variants.length - 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => moveVariant(index, index + 1)}
                      className="h-8 w-8 p-0"
                    >
                      ↓
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeVariant(index)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-gray-600">Length/Size</Label>
                  <Input
                    value={variant.length}
                    onChange={(e) => updateVariant(index, 'length', e.target.value)}
                    placeholder='e.g., 12"'
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs text-gray-600">Price (£)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={variant.price || ''}
                    onChange={(e) => updateVariant(index, 'price', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs text-gray-600">Sale Price (£)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={variant.sale_price || ''}
                    onChange={(e) => updateVariant(index, 'sale_price', parseFloat(e.target.value) || undefined)}
                    placeholder="Optional"
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs text-gray-600">SKU</Label>
                  <Input
                    value={variant.sku || ''}
                    onChange={(e) => updateVariant(index, 'sku', e.target.value || undefined)}
                    placeholder="Optional"
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <Switch
                  checked={variant.in_stock}
                  onCheckedChange={(checked) => updateVariant(index, 'in_stock', checked)}
                />
                <Label className="text-sm text-gray-600">In Stock</Label>
              </div>
            </div>
          ))}
        </div>
      )}

      {variants.length > 0 && (
        <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
          Price range will be calculated automatically from variants.
        </div>
      )}
    </div>
  );
}
