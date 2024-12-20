import { Star } from 'lucide-react';

interface ServiceRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
}

export function ServiceRating({ rating, onRate, readonly = true }: ServiceRatingProps) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => !readonly && onRate?.(star)}
          disabled={readonly}
          className={`${
            readonly ? 'cursor-default' : 'cursor-pointer'
          } transition-colors`}
        >
          <Star
            className={`h-5 w-5 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        </button>
      ))}
    </div>
  );
}