import { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSectionProps {
  title: string;
  items: Array<{ id: string; label: string; count: number }>;
  showItemCount?: boolean;
  maxItems?: number;
  onSelectionChange: (selectedIds: string[]) => void;
}

export function FilterSection({ 
  title, 
  items, 
  showItemCount = true,
  maxItems = 5,
  onSelectionChange 
}: FilterSectionProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleItems = isExpanded ? items : items.slice(0, maxItems);

  const handleItemToggle = (itemId: string) => {
    const newSelection = selectedItems.includes(itemId)
      ? selectedItems.filter(id => id !== itemId)
      : [...selectedItems, itemId];
    
    setSelectedItems(newSelection);
    onSelectionChange(newSelection);
  };

  return (
    <div className="border-b border-gray-200 py-4">
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <div className="mt-2 space-y-2">
        {visibleItems.map(item => (
          <label
            key={item.id}
            className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-50"
          >
            <div className="flex items-center">
              <div
                className={`flex h-5 w-5 items-center justify-center rounded border ${
                  selectedItems.includes(item.id)
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}
              >
                {selectedItems.includes(item.id) && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
              <span className="ml-2 text-sm text-gray-700">{item.label}</span>
            </div>
            {showItemCount && (
              <span className="text-sm text-gray-500">({item.count})</span>
            )}
          </label>
        ))}
      </div>
      {items.length > maxItems && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          {isExpanded ? (
            <>
              Show less
              <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Show all {items.length}
              <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
}