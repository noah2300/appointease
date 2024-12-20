import { useState } from 'react';
import { Tag, Plus, Calendar, DollarSign } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const mockPromotions = [
  {
    id: '1',
    name: 'Spring Special',
    discount: '20%',
    code: 'SPRING20',
    validUntil: '2024-04-30',
    status: 'active',
    usageCount: 45
  },
  {
    id: '2',
    name: 'First-Time Customer',
    discount: '15%',
    code: 'WELCOME15',
    validUntil: '2024-12-31',
    status: 'active',
    usageCount: 128
  }
];

export function PromotionsTab() {
  const [promotions] = useState(mockPromotions);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Promotions</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Promotion
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {promotions.map((promo) => (
          <div key={promo.id} className="rounded-lg border bg-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{promo.name}</h3>
                <div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
                  <Tag className="h-4 w-4" />
                  <span>Code: {promo.code}</span>
                </div>
                <div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Valid until: {promo.validUntil}</span>
                </div>
                <div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  <span>Discount: {promo.discount}</span>
                </div>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                promo.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {promo.status.charAt(0).toUpperCase() + promo.status.slice(1)}
              </span>
            </div>
            <div className="mt-4 border-t pt-4">
              <p className="text-sm text-gray-600">
                Used {promo.usageCount} times
              </p>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="outline" size="sm">Deactivate</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}