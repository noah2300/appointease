import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { AddServiceModal } from '../../components/features/AddServiceModal';

const mockServices = [
  {
    id: '1',
    name: 'Haircut',
    duration: 60,
    price: 50,
    description: 'Professional haircut service including wash and style',
    category: 'Hair',
    status: 'active'
  },
  {
    id: '2',
    name: 'Massage',
    duration: 90,
    price: 80,
    description: 'Relaxing full body massage',
    category: 'Spa',
    status: 'active'
  }
];

export function ServicesTab() {
  const [services, setServices] = useState(mockServices);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddService = (newService: any) => {
    setServices([
      ...services,
      {
        id: (services.length + 1).toString(),
        ...newService
      }
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Services</h2>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      <div className="rounded-lg border bg-white">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{service.name}</div>
                  <div className="text-sm text-gray-500">{service.description}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {service.duration} min
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  ${service.price}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {service.category}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    service.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddServiceModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddService}
      />
    </div>
  );
}