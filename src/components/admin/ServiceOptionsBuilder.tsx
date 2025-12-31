import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

export interface ServiceOption {
  name: string;
  duration: number;
  price: number;
}

interface ServiceOptionsBuilderProps {
  options: ServiceOption[];
  onOptionsChange: (options: ServiceOption[]) => void;
}

export function ServiceOptionsBuilder({ options, onOptionsChange }: ServiceOptionsBuilderProps) {
  const addOption = () => {
    onOptionsChange([
      ...options,
      { name: '', duration: 30, price: 0 },
    ]);
  };

  const removeOption = (index: number) => {
    onOptionsChange(options.filter((_, i) => i !== index));
  };

  const updateOption = (index: number, field: keyof ServiceOption, value: any) => {
    const updated = options.map((o, i) => {
      if (i !== index) return o;
      return { ...o, [field]: value };
    });
    onOptionsChange(updated);
  };

  const addPresetOptions = () => {
    const presets: ServiceOption[] = [
      { name: 'Short Hair', duration: 30, price: 0 },
      { name: 'Medium Hair', duration: 45, price: 0 },
      { name: 'Long Hair', duration: 60, price: 0 },
    ];
    onOptionsChange([...options, ...presets]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-gray-700 font-medium">Service Options (Different Durations/Prices)</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addPresetOptions}
            className="gap-1 border-gray-300 text-xs"
          >
            Add Hair Length Presets
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addOption}
            className="gap-1 border-gray-300"
          >
            <Plus className="h-4 w-4" />
            Add Option
          </Button>
        </div>
      </div>

      {options.length === 0 ? (
        <div className="text-sm text-gray-500 text-center py-4 border border-dashed border-gray-300 rounded-lg">
          No options added. Use options for services that vary by hair length, complexity, etc.
        </div>
      ) : (
        <div className="space-y-3">
          {options.map((option, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-3 bg-gray-50 flex items-center gap-3"
            >
              <div className="flex-1 grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-gray-600">Option Name</Label>
                  <Input
                    value={option.name}
                    onChange={(e) => updateOption(index, 'name', e.target.value)}
                    placeholder="e.g., Short Hair"
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs text-gray-600">Duration (mins)</Label>
                  <Input
                    type="number"
                    value={option.duration || ''}
                    onChange={(e) => updateOption(index, 'duration', parseInt(e.target.value) || 0)}
                    placeholder="30"
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs text-gray-600">Price (£)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={option.price || ''}
                    onChange={(e) => updateOption(index, 'price', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeOption(index)}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
