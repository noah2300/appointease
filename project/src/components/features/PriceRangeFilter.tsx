import { useState, useEffect } from 'react';

interface PriceRangeFilterProps {
  min: number;
  max: number;
  onChange: (range: { min: number; max: number }) => void;
}

export function PriceRangeFilter({ min, max, onChange }: PriceRangeFilterProps) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  useEffect(() => {
    onChange({ min: minValue, max: maxValue });
  }, [minValue, maxValue, onChange]);

  return (
    <div className="border-b border-gray-200 py-4">
      <h3 className="font-semibold text-gray-900">Price Range</h3>
      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-[45%]">
            <label className="text-sm text-gray-600">Min Price</label>
            <div className="mt-1 flex items-center">
              <span className="text-gray-500">$</span>
              <input
                type="number"
                value={minValue}
                onChange={(e) => setMinValue(Number(e.target.value))}
                min={min}
                max={maxValue}
                className="ml-1 w-full rounded-md border border-gray-300 p-2 text-sm"
              />
            </div>
          </div>
          <span className="text-gray-400">-</span>
          <div className="w-[45%]">
            <label className="text-sm text-gray-600">Max Price</label>
            <div className="mt-1 flex items-center">
              <span className="text-gray-500">$</span>
              <input
                type="number"
                value={maxValue}
                onChange={(e) => setMaxValue(Number(e.target.value))}
                min={minValue}
                max={max}
                className="ml-1 w-full rounded-md border border-gray-300 p-2 text-sm"
              />
            </div>
          </div>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={(e) => setMaxValue(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${min}</span>
          <span>${max}</span>
        </div>
      </div>
    </div>
  );
}