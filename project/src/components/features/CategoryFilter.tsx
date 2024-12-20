import { useState } from 'react';
import { Check } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  count: number;
}

const categories: Category[] = [
  { id: '1', name: 'Hair Salon', count: 42 },
  { id: '2', name: 'Spa & Massage', count: 28 },
  { id: '3', name: 'Dental Care', count: 15 },
  { id: '4', name: 'Fitness', count: 33 },
  { id: '5', name: 'Home Services', count: 21 }
];

export function CategoryFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Categories</h3>
      {categories.map(category => (
        <label
          key={category.id}
          className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-50"
        >
          <div className="flex items-center">
            <div
              className={`flex h-5 w-5 items-center justify-center rounded border ${
                selectedCategories.includes(category.id)
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}
            >
              {selectedCategories.includes(category.id) && (
                <Check className="h-3 w-3 text-white" />
              )}
            </div>
            <span className="ml-2">{category.name}</span>
          </div>
          <span className="text-sm text-gray-500">({category.count})</span>
        </label>
      ))}
    </div>
  );
}